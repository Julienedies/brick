/**
 * textarea 自适应高度
 * Created by j on 2024/9/2.
 */

import $ from 'jquery'

export default function ($elm, attrs) {

    //console.log( $elm, attrs);

    let m = 3;

    // 这里如果textarea元素一开始是隐藏的，并不能获取正确的scrollHeight
    if ($elm[0].offsetParent !== null) {
			$elm.css('height', $elm[0].scrollHeight + m + 'px');
		} else {
			// 创建克隆元素
			let clone = $elm.clone();

			// 设置克隆元素的样式，使其不影响布局且不可见
			clone.css({
				position: 'absolute',
				top: '-9999px', // 移出视口
				left: '-9999px',
				visibility: 'hidden',
				display: 'block', // 强制显示
				width: $elm[0].offsetWidth + 'px', // 保持宽度一致
				boxSizing: 'border-box',
			});

			// 复制可能影响高度的内联样式
			['fontSize', 'fontFamily', 'lineHeight', 'padding'].forEach((prop) => {
				clone.css(prop, $elm.css(prop));
			});

			// 临时添加到文档中计算高度
			document.body.appendChild(clone[0]);

			// 获取克隆元素的内容高度
			clone.css('height', 'auto');
			const contentHeight = clone[0].scrollHeight;
            // 移除克隆元素
            document.body.removeChild(clone[0]);
            
            $elm.css('height', contentHeight + m + 'px');
            
		}
 

    $elm.on('input', function (e) {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + m + 'px';
    });


}
