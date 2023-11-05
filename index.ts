import { Compiler, Compilation, Module } from 'webpack';

export interface TodoLogWebpackPluginOptions {
  enable: boolean;
  todoRule: string;
  skipRule: string | false;
}

export interface TodoComment {
  comment: string;
  path: string;
}

const PLUGIN_NAME = 'TodoLogWebpackPlugin';

export class TodoLogWebpackPlugin {
  private options: TodoLogWebpackPluginOptions = {
    enable: true,
    todoRule: '@TODO',
    skipRule: false,
  };
  private todoComments: TodoComment[];

  constructor(options: Partial<TodoLogWebpackPluginOptions>) {
    this.options = { ...this.options, ...options };
    this.todoComments = [];
  }

  apply(compiler: Compiler): void {
    if (!this.options.enable) {
      return;
    }

    const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);

    compiler.hooks.emit.tapAsync(PLUGIN_NAME, (compilation: Compilation, callback: () => void) => {
      this.runSaveTodoComments(compilation);

      callback();
    });

    compiler.hooks.afterDone.tap(PLUGIN_NAME, () => {
      this.todoComments.forEach(({ comment, path }) => {
        logger.info(`${comment} - ${path}`);
      });
    });
  }

  private runSaveTodoComments(compilation: Compilation) {
    compilation.modules.forEach((module: Module) => {
      const todoReg = new RegExp(`${this.options.todoRule}(.+)`, 'g');
      const todoSourceLines =
        module
          .originalSource()
          ?.source()
          ?.toString()
          ?.match(todoReg)
          ?.filter((todoLine) => (this.options.skipRule ? todoLine.includes(this.options.skipRule) : true)) || [];

      todoSourceLines.forEach((comment) => {
        this.todoComments.push({
          comment,
          path: (module as any)?.resource || '',
        });
      });
    });
  }
}

export default TodoLogWebpackPlugin;
