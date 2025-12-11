module "*.module.scss" {
  export default Record<string, string>;
}

module "*.scss" {
  // No exports for non-module SCSS files
}

module "*.png" {
  export default string;
}