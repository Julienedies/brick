/**
 * textarea 自适应高度
 * Created by j on 2024/9/2.
 */

import $ from 'jquery'

export default function ($elm, attrs) {

    //console.log( $elm, attrs);

    let m = 3;

    $elm.css('height', $elm[0].scrollHeight + m + 'px');

    $elm.on('input', function (e) {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + m + 'px';
    });


}
