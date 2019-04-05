/**
 * # 指令name
 * ic-upload
 *
 * # 指令选项
 * ic-upload-action
 * ic-upload-before
 * ic-upload-on-done
 * ic-upload-on-failed
 * ic-upload-on-always

 * # 指令相关dom
 * ic-upload-confirm
 * ic-upload-preview
 *
 * Created by Julien on 2015/7/23.
 */

import $ from 'jquery'

export default {
    name: 'ic-upload',
    fn: function ($elm, attrs) {
        console.log('exec ic-upload;')

        let nameSpace = $elm.attr('ic-upload');

        // 指令相关dom
        let $file = $elm.find('[type=file]');
        // 上传确认按钮
        let $confirm = $elm.find('[ic-upload-confirm]');

        //let $uploadPreview = $elm.find('[ic-upload-preview]');  // 图片上传预览
        // let $btn = $elm.find('[ic-upload-btn]').css({position: 'relative'});
        //$file.closest('form').appendTo($btn);
        //$file.css({position: 'absolute', bottom: 0, right: 0, top: 0, left: 0, opacity: 0});

        // 如果有额外的上冲确认按钮, 则通过确认按钮提交上冲
        // 否则使用file dom 的change事件进行上冲
        if($confirm.length){
            $confirm.on('click', upload)
        }else{
            $file.change(upload)
        }

        // ------------------------------------------------------------------------------------
        function upload(){
            let fx = (...args) => { };
            // 指令选项
            let uploadUrl = $elm.attr('ic-upload-action');
            let before = $elm.icPp2('ic-upload-before') || fx;
            let done = $elm.icPp2('ic-upload-on-done') || fx;
            let failed = $elm.icPp2('ic-upload-on-failed') || fx;
            let always = $elm.icPp2('ic-upload-on-always') || fx;

            let $th = $file;
            let name = $file.attr('name') || nameSpace;

            // 创建FormData对象, 用于模拟表单提交
            let data = new FormData();
            // 为FormData对象添加数据
            $.each($file[0].files, function (i, file) {
                data.append(i, file);
            });

            // 上传前回调, 返回false则取消上传
            if(before(data) === false) return;

            $elm.setLoading();

            $.ajax({
                url: uploadUrl,
                type: 'POST',
                data: data,
                cache: false,
                contentType: false,    //不可缺
                processData: false     //不可缺
            }).done(function (data) {
                    done.apply($elm[0], [data]);
                }
            ).fail(function (msg) {
                    failed.apply($elm[0], [msg]);
                }
            ).always(function () {
                $elm.clearLoading();
                always.apply($elm[0]);
            });
        }

    }
}

