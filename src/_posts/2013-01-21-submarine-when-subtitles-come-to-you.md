---
layout: post
title: "Submarine: When subtitles come to you"
tags: ['subtitle', 'tool']
---

I must confess that I'm on Windows 7 at home. Not because I love it or I can't deal without it but because I'm also a drummer, a photographer, a video gamer, and most of these stuff are (unfortunately) on Windows. I hope one day it won't be anymore but for the moment it's the case. Well, it's not my point today. It will be also a future article about how to develop on Windows (yes, it's possible, you will see).

Today, I will talk about [submarine](https://github.com/blazt/submarine), an excellent subtitle seeker. [Submarine](https://github.com/blazt/submarine) allows you to download easily subtitles of your favourite film or series. The command is simple (yes, it's in cli, that's why I love it):

```
$ submarine -l fr *.avi
```

It will search all french subtitles for every avi file. Isn't it great? No stupid gui, no adware, no bullshit; plus it's open source. \o/

### Quick install with Homebrew

```
$ brew tap orpiske/alt
$ brew install submarine
```

### Man

    $ submarine
    Usage:
      submarine [OPTION...] FILE... - download subtitles

    Help Options:
      -h, --help              Show help options

    Application Options:
      -l, --language=CODE     Set languages to filter (use '-l help' to list available options)
      -s, --server=CODE       Set servers to use (use '-s help' to list available options)
      -f, --force             Replace existing subtitles
      -q, --quiet             Be quiet
      -v, --verbose           Be verbose
      -V, --version           Show program information

    Powered by:
      OpenSubtitles (http://www.opensubtitles.org)
      Podnapisi (http://www.podnapisi.net/)


### Alternative

There's an alternative written in Python that I didn't try yet called [Periscope](https://github.com/patrickdessalle/periscope/).
