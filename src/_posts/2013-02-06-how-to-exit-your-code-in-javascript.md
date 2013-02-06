---
layout: post
title: "How to exit your code in JavaScript"
tags: ['javascript', 'debug']
---
[Update]
For the fellow developpers who already use it, Chrome has an handy instruction named **debugger**, which acts as if you set a breakpoint in your javascript code. 

* Type ***debugger*** in your js source file,
* Open the chrome dev tools
* Reload your browser

and once Chrome will execute the debugger instruction, your script will be paused and the scripts panel of the Developper Tools will automatically open. The scripts panel has all the common debugger features like add / remove breakpoint, step over an instruction, step into a function and step out. see the call stack... 
Now you are ready for debugging !

For a more in depth use of breakpoints in chrome, the [chrome dev center](https://developers.google.com/chrome-developer-tools/docs/scripts-breakpoints) is a good starting point.
And for the firefox users, take a look here [Venkmam, the Mozilla's JavaScript Debugger](https://developer.mozilla.org/en-US/docs/Venkman)


There's no real exit function in JavaScript, and sometimes you need to break your code just after debugging something.

To do that, you have two cases: when you are in a function, when you are in a loop.

### In a function

Just use ```return;```. Let's take the [Lo-Dash](http://lodash.com/) ```isEmpty()``` function where you need to debug a part of it.

{% highlight javascript %}
function isEmpty(value) {
    var result = true;
    if (!value) {
      return result;
    }
    var className = toString.call(value),
        length = value.length;

    // I want to see what length is. So, here's my code:
    console.log(length);
    return;

    if ((className == arrayClass || className == stringClass ||
        className == argsClass || (noArgsClass && isArguments(value))) ||
        (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
      return !length;
    }
    forOwn(value, function() {
      return (result = false);
    });
    return result;
  }
{% endhighlight %}

  It will display the variable ```length``` in the console and stop the execution of the rest of the function.

### In a loop

More simple, just use ```break;```. See:

{% highlight javascript %}
for (x=1; x<=10; x++) {
    a = x-7;

    // What's in `a` variable
    console.log(a);
    break;
}
{% endhighlight %}
