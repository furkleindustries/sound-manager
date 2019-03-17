import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IBaseNode,
} from './IBaseNode';
import {
  IConstructor,
} from '../interfaces/IConstructor';
import {
  ITaggableNode,
} from './ITaggableNode';
import {
  assert,
} from 'ts-assertions';

export function TaggableNodeMixin<T extends IConstructor<IBaseNode>>(Base: T) {
  return class TaggableNode extends Base implements ITaggableNode {
    public __tags: ReadonlyArray<string> = getFrozenObject([]);
    get tags(): ReadonlyArray<string> {
      return this.__tags;
    }

    constructor(...options: any[]) {
      super(...options);

      const [
        { tags },
      ]: [
        { tags?: ReadonlyArray<string> }
      ] = options as [ any ];

      if (Array.isArray(tags) &&
          tags.filter((aa) => typeof aa === 'string').length === tags.length)
      {
        this.__tags = getFrozenObject(tags);
      }
    }

    public readonly hasTag = (tag: string) => {
      assert(
        tag && typeof tag === 'string',
        'TaggableNode.hasTag was called with a non-string or empty argument.',
      );

      return this.tags.indexOf(tag) !== -1;
    };

    public readonly addTag = (tag: string) => {
      /* Don't add this if it's already in the tags array. Will throw if tag
       * is invalid. */
      if (this.hasTag(tag)) {
        return this;
      }

      this.__tags = this.tags.concat([ tag ]);

      return this;
    };

    public readonly removeTag = (tag: string) => {
      this.__tags = getFrozenObject(this.tags.filter((aa) => aa !== tag));
      return this;
    };
  };
}
