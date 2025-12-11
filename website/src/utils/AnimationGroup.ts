import { noop } from "lodash-es";
import { sleepAnimation } from "./index";

interface AnimationConfig extends KeyframeEffectOptions {
  element: HTMLElement;
  keyframes: Keyframe[] | PropertyIndexedKeyframes;
};

type AnimationConfigList = (AnimationConfig | SerialAnimationGroup | ParallelAnimationGroup)[];
type AnimationGroupOptions = {
  id?: string;
  delay?: number;
  direction?: PlaybackDirection;
  duration?: number;
  endDelay?: number;
  iterations?: number;
  fill?: FillMode;
};

type AnimationInstanceType = Animation | SerialAnimationGroup | ParallelAnimationGroup;

interface AnimationGroup {
  readonly finished: Promise<Animation>;
  readonly playState: AnimationPlayState;

  id: string;
  startTime: number;

  play(): void;
  pause(): void;
  reverse(): void;
  cancel(): void;
  finish(): void;
};

const PLAY_STATE_PRIORITY: Record<AnimationPlayState, number> = {
  // Any animation is running -> running
  running: 3,
  // otherwise, any animation is paused -> paused
  paused: 2,
  // otherwise, any animation is idle -> idle
  idle: 1,
  // only all sub animations are finished -> finished
  finished: 0,
};

function buildAnimationListRespectDirection(configs: AnimationConfigList, options: AnimationGroupOptions) {
  const {
    duration,
    direction,
  } = options;

  const builderFn = (c: AnimationConfig) => {
    if (c instanceof SerialAnimationGroup || c instanceof ParallelAnimationGroup) {
      return c;
    }

    const {
      element,
      keyframes,
      ...rest
    } = c;

    return new Animation(
      new KeyframeEffect(element, keyframes, {
        fill: 'both',
        duration,
        ...rest,
      }),
    );
  };

  switch (direction) {
    case 'reverse':
      return configs.map(builderFn).reverse();
    case 'alternate':
      return configs.map(builderFn).concat(configs.map(builderFn).reverse());
    case 'alternate-reverse':
      return configs.map(builderFn).reverse().concat(configs.map(builderFn));
    default:
      return configs.map(builderFn);
  }
}

export class SerialAnimationGroup
  implements AnimationGroup
{
  #list: AnimationConfigList = [];
  #options: AnimationGroupOptions = {};
  #resolvers = Promise.withResolvers<Animation>();
  #animations: AnimationInstanceType[] = [];

  id = '';
  startTime: number = null;

  get finished() {
    return this.#resolvers.promise;
  }

  get playState() {
    return this.#animations.reduce<AnimationPlayState>(
      (a, v) => (PLAY_STATE_PRIORITY[a] > PLAY_STATE_PRIORITY[v.playState]) ? a : v.playState,
      'finished',
    );
  }

  constructor(list: AnimationConfigList, options?: AnimationGroupOptions) {
    const {
      id = '',
      ...restOptions
    } = (options ?? {});

    this.id = id;
    this.#list = [...list];
    this.#options = restOptions;
  }

  play() {
    this.#run();
  }

  pause() {
    this.#animations.forEach((anim) => anim.pause());
  }

  reverse() {
    this.#run(true);
  }

  finish() {
    this.#animations.forEach((anim) => anim.finish());
  }

  cancel() {
    this.#animations.forEach((anim) => anim.cancel());
  }

  async #run(playbackReversed = false) {
    try {
      this.#resolvers = Promise.withResolvers();

      // Group options
      const {
        delay,
        endDelay,
        direction,
        iterations: _iterations,
      } = this.#options;

      // delay
      if (Number.isFinite(delay) && delay > 0) {
        await sleepAnimation(delay);
      }

      const maxIterations = typeof _iterations === 'number' ? Math.max(1, _iterations) : 1;

      let currentIteration = 0;
      let result: Animation;

      // cancel previous all animations
      // and build new animations list respecting direction
      this.cancel();
      this.#animations = buildAnimationListRespectDirection(this.#list, this.#options);

      const finalPlaybackReversed = Boolean(playbackReversed) !== (direction === 'reverse' || direction === 'alternate-reverse');
      const hasAlternative = direction === 'alternate' || direction === 'alternate-reverse';

      const listNormal = hasAlternative ? this.#animations.slice(0, this.#animations.length / 2) : [...this.#animations];
      const listAlternate = hasAlternative ? this.#animations.slice(this.#animations.length / 2) : [];

      if (finalPlaybackReversed) {
        listNormal.reverse();
        listAlternate.reverse();
      }

      // iterations
      while (currentIteration < maxIterations) {
        // Execute each animation in sequence
        for (let anim of listNormal) {
          finalPlaybackReversed ? anim.reverse() : anim.play();
          result = await anim.finished;
        }

        // For direction=alternate/alternate-reverse
        if (hasAlternative) {
          for (let anim of listAlternate) {
            finalPlaybackReversed ? anim.play() : anim.reverse();
            result = await anim.finished;
          }
        }

        currentIteration++;
      }

      // endDelay
      if (Number.isFinite(endDelay) && endDelay > 0) {
        await sleepAnimation(endDelay);
      }

      // if fill is none, cancel all animations
      if (this.#options.fill === 'none') {
        this.cancel();
      }

      this.#resolvers.resolve(result);
    }
    catch (e) {
      if (this.playState !== 'idle') {
        this.#resolvers.reject(e);
      }
    }
  }
}


export class ParallelAnimationGroup
  implements AnimationGroup
{
  #list: AnimationConfigList = [];
  #options: AnimationGroupOptions = {};
  #resolvers = Promise.withResolvers<Animation>();
  #animations: AnimationInstanceType[] = [];

  id = '';
  startTime: number = null;

  get finished() {
    return this.#resolvers.promise;
  }

  get playState() {
    return this.#animations.reduce<AnimationPlayState>(
      (a, v) => PLAY_STATE_PRIORITY[a] > PLAY_STATE_PRIORITY[v.playState] ? a : v.playState,
      'finished',
    );
  }

  constructor(list: AnimationConfigList, options?: AnimationGroupOptions) {
    const {
      id = '',
      ...restOptions
    } = (options ?? {});

    this.id = id;
    this.#list = [...list];
    this.#options = restOptions;
  }

  play() {
    this.#run();
  }

  pause() {
    this.#animations.forEach((anim) => anim.pause());
  }

  reverse() {
    this.#run(true);
  }

  finish() {
    this.#animations.forEach((anim) => anim.finish());
  }

  cancel() {
    try {
      this.#animations.forEach((anim) => anim.cancel());
    }
    catch {}
  }

  async #run(playbackReversed = false) {
    try {
      this.#resolvers = Promise.withResolvers();

      // Group options
      const {
        delay,
        endDelay,
        direction,
        iterations: _iterations,
      } = this.#options;

      // delay
      if (Number.isFinite(delay) && delay > 0) {
        await sleepAnimation(delay);
      }

      const maxIterations = typeof _iterations === 'number' ? Math.max(1, _iterations) : 1;

      let currentIteration = 0;
      let result: Animation[];

      // cancel previous all animations
      // and build new animations list respecting direction
      this.cancel();

      this.#animations = buildAnimationListRespectDirection(this.#list, this.#options);

      const finalPlaybackReversed = Boolean(playbackReversed) !== (direction === 'reverse' || direction === 'alternate-reverse');
      const hasAlternative = direction === 'alternate' || direction === 'alternate-reverse';

      const listNormal = hasAlternative ? this.#animations.slice(0, this.#animations.length / 2) : [...this.#animations];
      const listAlternate = hasAlternative ? this.#animations.slice(this.#animations.length / 2) : [];

      // iterations
      while (currentIteration < maxIterations) {
        // Execute each animation in sequence
        result = await Promise.all(listNormal.map((anim) => {
          finalPlaybackReversed ? anim.reverse() : anim.play();
          return anim.finished;
        }));

        // For direction=alternate/alternate-reverse
        if (hasAlternative) {
          result = await Promise.all(listAlternate.map((anim) => {
            finalPlaybackReversed ? anim.play() : anim.reverse();
            return anim.finished;
          }));
        }

        currentIteration++;
      }

      // endDelay
      if (Number.isFinite(endDelay) && endDelay > 0) {
        await sleepAnimation(endDelay);
      }

      // if fill is none, cancel all animations
      if (this.#options.fill === 'none') {
        this.cancel();
      }

      this.#resolvers.resolve(result.at(playbackReversed ? -1 : 0)!);
    }
    catch (e) {
      this.#resolvers.reject(e);
    }
  }
}