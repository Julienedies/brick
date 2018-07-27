/**
 * Created by Julien on 2015/7/23.
 */

brick.directives.reg('ic-upload', function ($elm, attrs) {

    var nameSpace = $elm.attr('ic-upload');
    var uploadUrl = $elm.attr('ic-upload-action');

    var done = $elm.attr('ic-upload-on-done');
    var always = $elm.attr('ic-upload-on-always');
    var failed = $elm.attr('ic-upload-on-failed');
    var before = $elm.attr('ic-upload-before');

    var $placeholderImg = $elm.find('[ic-upload-placeholder]');
    var $btn = $elm.find('[ic-upload-btn]').css({position: 'relative'});
    var $ok = $elm.find('[ic-upload-ok]');

    var $file = $elm.find('[type=file]');

    $file.closest('form').appendTo($btn);

    $file.css({position: 'absolute', bottom: 0, right: 0, top: 0, left: 0, opacity: 0});

    $file.change(function () {

        always = $elm.icParseProperty(always) || function () {
            //console.log('always is undefined;')
        };
        done = $elm.icParseProperty(done) || function () {
            //console.info('done is undefined;')
        };
        failed = $elm.icParseProperty(failed) || function (msg) {
            //console.info('failed is undefined;')
        };
        before = $elm.icParseProperty(before) || function () {
            //console.info('before is undefined;')
        };

        var $th = $(this);
        var name = this.name || nameSpace;

        //创建FormData对象
        var data = new FormData();

        //为FormData对象添加数据
        $.each(this.files, function (i, file) {
            data.append(name, file);
        });

        $elm.setLoading();

        $.ajax({
            url: uploadUrl,
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,    //不可缺
            processData: false     //不可缺
        }).done(function (data) {
                $placeholderImg.attr('src', data.path);
                console.log(done);
                done.apply($elm[0], [data]);
            }
        ).fail(function (msg) {
                failed.apply($elm[0], [msg]);
            }
        ).always(function () {
                $elm.clearLoading();
                always.apply($elm[0]);
            });

    });


});