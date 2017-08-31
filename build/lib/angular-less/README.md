# ngLess

Automagically render **LESS** `<link>`s in **AngularJS**.

## Installation

Download `angular-less.js` and add it to your HTML:
```html
<script src="angular-less.js"></script>
```

You can also find it on Bower:
```
bower install angular-less
```

## Usage

Just add `<link>`s, just like you are supposed to:
```html
<link rel="stylesheet/less" href="style.less">
```

**ngLess** will asynchronously issue a `$http.get()` for the file and insert a `<style>` in the `<head>` containing the `less.render()`d version of the file.

## Caveats

- When you include `less.js` in your project, it will automatically check for `<link>`s with `rel="stylesheet/less"` and convert them to CSS. You have to make sure that you add your `<link>`s **after** you load `less.js`. If you don't, the behaviour is undefined. (I always wanted to say "behaviour is undefined". It's such a cool way to say "I was too lazy to check what would happen.")

- The `<style>` element created by **ngLess** is removed when `$destroy` on the `<link>` element is fired. If you add and remove `<link>`s in a way that **AngularJS** won't detect, you will end up polluting your `<head>` with unwanted `<style>`s.

- **ngLess** attaches an `angular.directive()` to `<head>` to work. If you don't have a `<head>` (can you even not have a `<head>`?), **ngLess** will not work.