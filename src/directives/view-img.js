/**
 * 幻灯形式图片浏览
 * Created by j on 2019-04-06.
 */

export default {
    name: 'ic-view-img',
    selfExec: true,
    once: true,
    fn ($elm) {
        $(document.body).on('click', '[ic-img-item]', function (e) {
            let $box = $(this).closest('[ic-view-img]')

        })
    }
}
