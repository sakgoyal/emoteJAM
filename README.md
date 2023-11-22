# emoteJAM

`emoteJAM` is a simple website that generates animated [BTTV](https://betterttv.com/) emotes from static images.

That idea is to apply a well established "meme meta filters" to static emotes. Such as [JAM](https://betterttv.com/emotes/5b77ac3af7bddc567b1d5fb2), [Hop](https://betterttv.com/emotes/5a9578d6dcf3205f57ba294f), etc.

The most important feature of the website is that it's completely client-side and can be easily deployed to something like [GitHub Pages](https://pages.github.com/). It uses [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) to animate static images and [gif.js](https://jnordberg.github.io/gif.js/) to generate actual GIF files inside of your browser.

Official Deployed Instance: [https://tsoding.github.io/emoteJAM/](https://tsoding.github.io/emoteJAM/)

## Running Locally

Nothing particularly special is required. Just serve the folder using HTTP server like Python's SimpleHTTPServer:

```console
$ python3 -m http.server 6969
$ iexplore.exe http://localhost:6969/
```

## Building

The whole build is organized so you can just serve the repo via an HTTP server and it just works. This is done to simplify deployment to [GitHub pages](https://pages.github.com/). We just tell GitHub to service this repo as is. The build artifacts are also commited to the repo. So if you want to simply get the website working you don't even have to build anything. Just serve the repo.

This build consist of two parts: `main` and `serviceworker`. This separation is important because these two parts are built with different TypeScript flags and dependancies. We are planning to get rid of the separation in the future somehow.

The build is done via the [./build.js](./build.js) script. It is recommended to read it to get an idea on how it works. It is also recommended to check the `"scripts"` section of [./package.json](./package.json) to get an idea on how it is called from `npm run`.

Before doing any building make sure you installed all the necessary dependencies:

```console
$ npm install
```

To build both of the parts:

```console
$ npm run build
```

### Building `main` part only

```console
$ npm run build -- main
```

This command takes all the files [./ts/](./ts/) and compiles them to JavaScript in [./js/](./js/).

### Building `serviceworker` part

```console
$ npm run build -- serviceworker
```

This compiles [./serviceworker.ts](./serviceworker.ts) to [./serviceworker.js](./serviceworker.js).

## Watching

The [./build.js](./build.js) script enables you to  [Watch](https://www.typescriptlang.org/docs/handbook/configuring-watch.html#handbook-content) the source code. Since the build is split into two separate parts you have to watch them separately for now:

To watch the `main` part:
```console
$ npm run watch -- main
```

To watch the `serviceworker` part:
```console
$ npm run watch -- serviceworker
```

# Filter Development

**WARNING! Knowledge of [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) or [OpenGL](https://www.opengl.org/) is required to read this section!**

## Uniforms

| Name | Type | Description |
| --- | --- | --- |
| `time` | `float` | Current time in Seconds (float) since the start of the application. Can be used for animating. |
| `resolution` | `vec2` | Resolution of the emote canvas in Pixels. |
| `emote` | `sampler2D` | The input image as the WebGL texture. |
| `emoteSize` | `vec2` | The input image size in pixels. |
