export interface ITaggableNode {
  readonly tags: ReadonlyArray<string>;
  addTag(tag: string): this;
  removeTag(tag: string): this;
  hasTag(tag: string): boolean;
}