#!/bin/sh
# $1 phpの文法チェックをしたいディレクトリ
#http://kaworu.jpn.org/kaworu/2007-11-17-2.php

flg=0

phpsyntaxcheck()
{
    for i in `find -E "$1" -regex '.*\.(php|inc)' `
    do
        msg=`php -l "$i"` 
        check=`echo $msg | cut -c 1-25 `
        if [ "$check" != 'No syntax errors detected' ] ; then
            echo $msg
            echo ''
            flg=1
        fi
    done
}

echo ''
for i in "$@"
do
        phpsyntaxcheck "$i"
done

if [ $flg -eq 1 ] ; then
    echo 'Syntax check error!'
else
    echo 'Syntax check OK!'
fi
echo ''
