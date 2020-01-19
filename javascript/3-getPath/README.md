# About

Обратный поиск от выделенного  элемента к элементу 'BODY', и составление пути по маске " > @NodeName(.@class x classList.length) > "

# Description

Написать алгоритм и функцию `getPath()`, находяющую уникальный css-селектор для элемента в документе.
Уникальный селектор может быть использован `document.querySelector()` и возвращать исходный элемент.
`document.querySelectorAll()`, вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.

# How to

Использовать для проверки в консоли:
    $0 === document.querySelector( getPath($0) )
    document.querySelectorAll( getPath($0) ).length == 1