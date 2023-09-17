export abstract class Task {
  abstract readonly WATCH_TARGET: string;
  abstract convert(globs?: string): NodeJS.ReadWriteStream;
}
