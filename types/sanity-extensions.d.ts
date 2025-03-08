import "@sanity/types";

declare module "@sanity/types" {
  interface BaseSchemaTypeOptions {
    singleton?: boolean;
  }
}
