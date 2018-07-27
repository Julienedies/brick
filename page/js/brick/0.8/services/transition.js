/**
 * Created by Julien on 2015/9/1.
 */

/**
 * 获取一个动画类
 * @param animation {Number} 1-67
 * @returns {{inClass: string, outClass: string}}
 */
brick.getAniMap = function (animation) {

    animation = animation*1 > 67 ? 0 : animation*1;
    animation = animation || Math.round(Math.random() * 66 + 1);

    console.info('animation id is ' + animation);

    var outClass = '', inClass = '';

    switch (animation) {

        case 1:
            outClass = 'pt-page-moveToLeft';
            inClass = 'pt-page-moveFromRight';
            break;
        case 2:
            outClass = 'pt-page-moveToRight';
            inClass = 'pt-page-moveFromLeft';
            break;
        case 3:
            outClass = 'pt-page-moveToTop';
            inClass = 'pt-page-moveFromBottom';
            break;
        case 4:
            outClass = 'pt-page-moveToBottom';
            inClass = 'pt-page-moveFromTop';
            break;
        case 5:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
        case 6:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
        case 7:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
        case 8:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
        case 9:
            outClass = 'pt-page-moveToLeftFade';
            inClass = 'pt-page-moveFromRightFade';
            break;
        case 10:
            outClass = 'pt-page-moveToRightFade';
            inClass = 'pt-page-moveFromLeftFade';
            break;
        case 11:
            outClass = 'pt-page-moveToTopFade';
            inClass = 'pt-page-moveFromBottomFade';
            break;
        case 12:
            outClass = 'pt-page-moveToBottomFade';
            inClass = 'pt-page-moveFromTopFade';
            break;
        case 13:
            outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
            inClass = 'pt-page-moveFromRight';
            break;
        case 14:
            outClass = 'pt-page-moveToRightEasing pt-page-ontop';
            inClass = 'pt-page-moveFromLeft';
            break;
        case 15:
            outClass = 'pt-page-moveToTopEasing pt-page-ontop';
            inClass = 'pt-page-moveFromBottom';
            break;
        case 16:
            outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
            inClass = 'pt-page-moveFromTop';
            break;
        case 17:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
        case 18:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
        case 19:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
        case 20:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
        case 21:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-scaleUpDown pt-page-delay300';
            break;
        case 22:
            outClass = 'pt-page-scaleDownUp';
            inClass = 'pt-page-scaleUp pt-page-delay300';
            break;
        case 23:
            outClass = 'pt-page-moveToLeft pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
        case 24:
            outClass = 'pt-page-moveToRight pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
        case 25:
            outClass = 'pt-page-moveToTop pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
        case 26:
            outClass = 'pt-page-moveToBottom pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
        case 27:
            outClass = 'pt-page-scaleDownCenter';
            inClass = 'pt-page-scaleUpCenter pt-page-delay400';
            break;
        case 28:
            outClass = 'pt-page-rotateRightSideFirst';
            inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
            break;
        case 29:
            outClass = 'pt-page-rotateLeftSideFirst';
            inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
            break;
        case 30:
            outClass = 'pt-page-rotateTopSideFirst';
            inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
            break;
        case 31:
            outClass = 'pt-page-rotateBottomSideFirst';
            inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
            break;
        case 32:
            outClass = 'pt-page-flipOutRight';
            inClass = 'pt-page-flipInLeft pt-page-delay500';
            break;
        case 33:
            outClass = 'pt-page-flipOutLeft';
            inClass = 'pt-page-flipInRight pt-page-delay500';
            break;
        case 34:
            outClass = 'pt-page-flipOutTop';
            inClass = 'pt-page-flipInBottom pt-page-delay500';
            break;
        case 35:
            outClass = 'pt-page-flipOutBottom';
            inClass = 'pt-page-flipInTop pt-page-delay500';
            break;
        case 36:
            outClass = 'pt-page-rotateFall pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
        case 37:
            outClass = 'pt-page-rotateOutNewspaper';
            inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
            break;
        case 38:
            outClass = 'pt-page-rotatePushLeft';
            inClass = 'pt-page-moveFromRight';
            break;
        case 39:
            outClass = 'pt-page-rotatePushRight';
            inClass = 'pt-page-moveFromLeft';
            break;
        case 40:
            outClass = 'pt-page-rotatePushTop';
            inClass = 'pt-page-moveFromBottom';
            break;
        case 41:
            outClass = 'pt-page-rotatePushBottom';
            inClass = 'pt-page-moveFromTop';
            break;
        case 42:
            outClass = 'pt-page-rotatePushLeft';
            inClass = 'pt-page-rotatePullRight pt-page-delay180';
            break;
        case 43:
            outClass = 'pt-page-rotatePushRight';
            inClass = 'pt-page-rotatePullLeft pt-page-delay180';
            break;
        case 44:
            outClass = 'pt-page-rotatePushTop';
            inClass = 'pt-page-rotatePullBottom pt-page-delay180';
            break;
        case 45:
            outClass = 'pt-page-rotatePushBottom';
            inClass = 'pt-page-rotatePullTop pt-page-delay180';
            break;
        case 46:
            outClass = 'pt-page-rotateFoldLeft';
            inClass = 'pt-page-moveFromRightFade';
            break;
        case 47:
            outClass = 'pt-page-rotateFoldRight';
            inClass = 'pt-page-moveFromLeftFade';
            break;
        case 48:
            outClass = 'pt-page-rotateFoldTop';
            inClass = 'pt-page-moveFromBottomFade';
            break;
        case 49:
            outClass = 'pt-page-rotateFoldBottom';
            inClass = 'pt-page-moveFromTopFade';
            break;
        case 50:
            outClass = 'pt-page-moveToRightFade';
            inClass = 'pt-page-rotateUnfoldLeft';
            break;
        case 51:
            outClass = 'pt-page-moveToLeftFade';
            inClass = 'pt-page-rotateUnfoldRight';
            break;
        case 52:
            outClass = 'pt-page-moveToBottomFade';
            inClass = 'pt-page-rotateUnfoldTop';
            break;
        case 53:
            outClass = 'pt-page-moveToTopFade';
            inClass = 'pt-page-rotateUnfoldBottom';
            break;
        case 54:
            outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomLeftIn';
            break;
        case 55:
            outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomRightIn';
            break;
        case 56:
            outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomTopIn';
            break;
        case 57:
            outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomBottomIn';
            break;
        case 58:
            outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeLeftIn';
            break;
        case 59:
            outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeRightIn';
            break;
        case 60:
            outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeTopIn';
            break;
        case 61:
            outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeBottomIn';
            break;
        case 62:
            outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselLeftIn';
            break;
        case 63:
            outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselRightIn';
            break;
        case 64:
            outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselTopIn';
            break;
        case 65:
            outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselBottomIn';
            break;
        case 66:
            outClass = 'pt-page-rotateSidesOut';
            inClass = 'pt-page-rotateSidesIn pt-page-delay200';
            break;
        case 67:
            outClass = 'pt-page-rotateSlideOut';
            inClass = 'pt-page-rotateSlideIn';
            break;

    }

    return {inClass: inClass, outClass: outClass};
};

/**
 * 扩展jquery，添加转场动画支持
 * example: $('#view1').icAniOut($('#view2')); //#view1 in，#view2 out.
 * 一个元素css display:none  不能做css3动画
 */
;
(function () {

    var $doc = $('body');
    var animEndEventName = 'webkitAnimationEnd';

    function initStatus($elm) {
        $elm.attr('ic-isAnimating', false);
        $elm.addClass('ic-animating');
        $elm.attr('ic-aniEnd', false);
        $elm.removeAttr('ic-aniIn');
    }

    function onEndAnimation($elm, call) {
        $elm.removeClass('ic-animating');
        $elm.off(animEndEventName).attr('ic-aniEnd', true).trigger('ic-aniEnd');
        call && call.call($elm[0]);
    }

    //out
    $.fn.icAniOut = function (aniId, $next, call) {

        var args = [].slice.call(arguments);

        aniId = $next = call = void(0);

        args.forEach(function (v) {
            if (_.isFunction(v)) {
                call = v;
            } else if (_.isObject(v)) {
                $next = v;
            } else if (_.isNumber(v)) {
                aniId = v;
            }
        });

        $next = $($next);

        var $current = this;

        $current = $current[0] && $current[0].hasAttribute ? $current : false;
        $next = $next[0] && $next[0].hasAttribute ? $next : false;

        if(!$next){

            if(!aniId){
                aniId = aniId || this.attr('ic-aniId');
                aniId = aniId && aniId * 1;
                aniId = aniId && aniId % 2 ? aniId + 1 : aniId - 1;
            }

        }

        var cla = brick.getAniMap(aniId);
        var inClass = cla.inClass;
        var outClass = cla.outClass;

        // $doc.animate({scrollTop: 0}, 150);
        //$doc.scrollTop(0);

        if ($current && !$current.hasClass('ic-animating')) {

            initStatus($current);

            $current.addClass(outClass).on(animEndEventName, function () {

                $current.removeClass(outClass);
                $current.removeAttr('ic-active');
                $current.removeAttr('ic-aniIn');
                $current.attr('ic-aniOut', true);
                onEndAnimation($current, call);

                if (!$next || $next && $next.attr('ic-aniEnd')) {
                    //_onEndAnimation($current);
                }

            });

        }


        if ($next && !$next.hasClass('ic-animating')) {

            initStatus($next);

            $next.attr('ic-aniId', aniId);
            $next.attr('ic-active', true);
            $next.attr('ic-aniIn', true);
            $next.removeAttr('ic-aniOut').addClass(inClass).on(animEndEventName, function () {

                $next.removeClass(inClass);
                onEndAnimation($next, call);

                if (!$current || $current && $current.attr('ic-aniEnd')) {
                    //_onEndAnimation($next);
                }

            });

        }

        return this;

    };

    //in
    $.fn.icAniIn = function (aniId, $next, call) {

        var args = [].slice.call(arguments);

        aniId = $next = call = void(0);

        args.forEach(function (v) {
            if (_.isFunction(v)) {
                call = v;
            } else if (_.isObject(v)) {
                $next = v;
            } else if (_.isNumber(v)) {
                aniId = v;
            }
        });

        $next = $next || $({});

        return $next.icAniOut(aniId, this, call);
    }

})();


;
(function () {

    function Transition(conf) {
        _.extend(this, conf || {});
        this.history = [];
        this.pool = {};
        this.conf = {};
        this.currentView = '';
        this.$current = $({});
        //this.current();
    }

    var proto = {
        cache: function (name, $view) {
            var viewProp = this.pool[name] = this.pool[name] || {};
            if ($view) {
                viewProp.$view = $view;
                viewProp.aniId = $view.attr('ic-view-ani-id')*1 || brick.get('view.aniId') || 13 || Math.round(Math.random() * 66 + 1);
            }
            $view = viewProp.$view;
            if (!$view) {
                $view = $('[ic-view=?]'.replace('?', name));
                return this.cache(name, $view);
            }
            return viewProp;
        },
        current: function () {
            var currentView = this.currentView;
            if (!currentView) {
                var $view = $('[ic-view][ic-active]');
                currentView = $view.attr('ic-view');
                this.currentView = currentView;
                this.$current = $view;
                this.cache(currentView, $view);
            }
            return currentView;
        },
        to: function (name, reverse) {
            if(!name) throw 'must to provide name of view.';
            var that = this;
            var currentView = this.current();
            if(currentView == name) return;
            var nextViewProp = this.cache(name);
            var currentViewProp = this.cache(currentView);
            var aniId = currentViewProp.aniId;
            aniId = reverse ? aniId % 2 ? aniId + 1 : aniId - 1 : aniId;
            nextViewProp.$view.trigger('ic-view.active', nextViewProp);
            currentViewProp.$view.icAniOut(aniId, nextViewProp.$view, function(){
                !reverse && that.history.push(currentView);
                that.currentView = name;
                that.$current = nextViewProp.$view;
            });
        },
        back: function () {
            var prev = this.history.pop();
            prev && this.to(prev, true);
        }
    };

    for (var i in proto) {
        Transition.prototype[i] = proto[i];
    }


    var transition = brick.view = new Transition;
    var eventAction = brick.get('event.action');

    $(document.body).on(eventAction, '[ic-view-to]', function (e) {
        var name = $(this).attr('ic-view-to');
        transition.to(name);
    }).on('click', '[ic-view-back]', function (e) {
        transition.back();
    });

})();
