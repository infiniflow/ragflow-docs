import blogPlugin from '@docusaurus/plugin-content-blog';
import { DEFAULT_OPTIONS } from '@docusaurus/plugin-content-blog/src/options';
import { groupBy, mapValues } from 'lodash-es';

module.exports = async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, { ...DEFAULT_OPTIONS, ...options });

  return {
    ...blogPluginInstance,

    /**
     * @param {{ content: import('@docusaurus/plugin-content-blog').BlogContent, actions: PluginContentLoadedActions }} args
     */
    async contentLoaded({ content, actions }) {
      await blogPluginInstance.contentLoaded({ content, actions });

      const {
        blogTags,
        blogTagsListPath,
        authorsMap,
      } = content;

      const blogYears = mapValues(
        groupBy(content.blogPosts, (post) => post.metadata.date.getFullYear()),
        (posts, label) => {
          return {
            label,
            items: posts.map(({ id }) => id),
          };
        },
      );

      // Extract necessary data to global data
      actions.setGlobalData({
        blogTags,
        blogTagsListPath,
        blogYears,
        authorsMap,
      });
    }
  }
}
