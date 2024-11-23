---
title: 'wgo: a simple live reloading tool'
slug: wgo_a_simple_live_reloading_tool
date: 2024-11-23
tags: ['wgo', 'DX', 'Go']
---

<p className="lead">
  Until now, trying to have a simple live reloading tool for anything has been a tedious task that either forces you to wrap commands into strings, requires config files, or log a lot of garbage to the console.
</p>

For example, let's say you were creating a Go project with templ, with build commands in a `makefile`, and wanted live reloading. Normally, you would use a tool like Air, which would need a `air.toml` file that looks like this:

```toml
root = "."
testdata_dir = "testdata"
tmp_dir = "tmp"

[build]
  args_bin = []
  bin = "./main"
  cmd = "make build"
  delay = 1000
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]
  exclude_file = []
  exclude_regex = ["_test.go", ".*_templ.go"]
  exclude_unchanged = false
  follow_symlink = false
  full_bin = ""
  include_dir = []
  include_ext = ["go", "tpl", "tmpl", "html", "templ"]
  include_file = []
  kill_delay = "0s"
  log = "build-errors.log"
  poll = false
  poll_interval = 0
  post_cmd = []
  pre_cmd = []
  rerun = false
  rerun_delay = 500
  send_interrupt = false
  stop_on_error = false

[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  main_only = false
  time = false

[misc]
  clean_on_exit = false

[screen]
  clear_on_rebuild = false
  keep_scroll = true
```

All this just to get live reloading. And it doesn't even support parallel execution of commands. It's a lot of work for something that should be simple.

### Enter wgo

wgo is a minimalist live reloading tool that works with any programming language. Built with simplicity in mind, the entire codebase consists of just two files: `main.go` and `wgo_cmd.go`. You can explore the complete source code [here](https://github.com/bokwoon95/wgo/blob/main/START_HERE.md).


## How to use wgo

Using wgo is so straightforward, you already know how to use it. Just slap the command in front of any command to run it with live reloading.

```bash
# Run gcc.
$ gcc -Wall -o main main.c

# Run gcc whenever a file changes.
$ wgo gcc -Wall -o main main.c
```

For Go projects, the `wgo run` command is a drop-in replacement for `go run`. This command will run your Go program whenever a `.go` file changes. It also supports any flag that can be passed to `go run`.

```bash
# Run main.go.
$ go run main.go

# Run main.go whenever a .go file changes.
$ wgo run main.go

# Any flag that can be passed to `go run` can also be passed to `wgo run`.
$ wgo run -tags=fts5 -race -trimpath main.go
```

That's it. No config files, no wrapping commands in strings, no garbage in the console. Just simple, easy-to-use live reloading.

## What else can wgo do?

wgo is designed to be simple, yet powerful. It supports command chaining, so you can run multiple commands in sequence. Just separate each command with a `::`.

```bash
# Run gcc and then run the compiled binary.
$ wgo gcc -Wall -o main main.c :: ./main

# Clear the screen with `clear` before running `go test`.
$ wgo -file .go clear :: go test . -race -coverprofile=coverage.out
```

If a command separetor `::` is followed by `wgo`, the subsequent wgo command will be run in parallel.

```bash
# Run the echo commands sequentially.
$ wgo echo foo :: echo bar :: echo baz

# Run the echo commands in parallel.
$ wgo echo foo :: wgo echo bar :: wgo echo baz
```

This enables you to for example reload a server when a `.go` files changes, but also rebuild `.scss` and `.ts` files whenever they change at the same time.

```bash
$ wgo run main.go \
  :: wgo -file .scss sass assets/styles.scss assets/styles.css \
  :: wgo -file .ts tsc 'assets/*.ts' --outfile assets/index.js
```

There are many more features in wgo such as running commands in different directories, file and directory inclusion/exclusion, and exiting when the last command exits. You can read the full documentation [here](https://github.com/bokwoon95/wgo/blob/main/README.md).

## Who is it for?

wgo is a simple file watcher that's great for developers who want to:
- Get started quickly without configuration
- Use across different programming languages
- Run multiple commands at once
- Keep their development workflow simple

If that sounds useful for your needs, give wgo a try. The tool is intentionally minimal and focused on doing one thing well - watching files and running commands when they change.

## Resources
- [GitHub Repository](https://github.com/bokwoon95/wgo)
