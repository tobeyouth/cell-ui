/**
 * js模拟单选
 *
 * 2013 12 30
 * by jn
 */
define(function (require,exports,module) {
	var defaultTpl = require('./tpl').tpl,
		defaultConfig = {
			'target' : '',		// str:radio元素
			'value' : '',		// str:value值
			'text' : '',		// str:内容
			'name' : '',		// str:radio的name
			'id' : '',			// str:radio的id
			'tpl' : defaultTpl, // str:模板
			'defaultChange' : true, // 是否在选中的情况下，一上来就直接指向change的回调
			'change' : null		// fun:选择之后的回调
		};

	function Radios(config) {
		this.config = $.extend({},defaultConfig,config);
		this.name = this.config.name;
		this.target = $(this.config.target);
		this.init();
	};

	Radios.prototype = {
		'constructor' : Radios,
		'init' : function () {
			var radio = this;

			radio.build(radio.config);
			radio.bindEvent();

			if (radio.config.checked && radio.config.defaultChange && $.isFunction(radio.config.change)) {
				radio.config.change.call(radio,radio.dom,radio.target[0])
			};

			return radio;
		},
		'build' : function (renderData) {
			var radio = this,
				render = template.compile(radio.config.tpl),
				html = render(renderData);

			radio.dom = $(html);
			radio.target.parent('label').after(radio.dom);
			radio.target.parent('label').hide();

			return radio;
		},
		'bindEvent' : function () {
			var radio = this;

			radio.dom.click(function (e) {
				e.preventDefault();
				var _disabled = $(this).attr('data-disabled') === "disabled";
				if (_disabled) {
					return;
				};
				radio.change({
					'trigger' : radio.dom,
					'target' : radio.target[0],
					'checkedClass' : 'cell_radio_checked',
					'name' : radio.config.name,
					'callback' : radio.config.change
				});
				radio.target[0].checked = true;
			});
			radio.dom.mouseover(function (e) {
				radio.dom.addClass('cell_radio_hover');
			});
			radio.dom.mouseout(function (e) {
				radio.dom.removeClass('cell_radio_hover');
			});

			return radio;
		},
		'change' : function (data) {
			var radio = this,
				trigger = data && data.trigger ? data.trigger : radio.dom,
				target = data && data.target ? data.target : radio.target[0],
				checkedClass = data && data.checkedClass ? data.checkedClass : 'cell_radio_checked',
				name = data && data.name ? data.name : radio.config.name,
				others = $('.'+checkedClass);
			
			if (!target.checked) {
				target.checked = true;
				trigger.addClass(checkedClass);
				
				others.each(function (index) {
					var _name = $(this).attr('data-name');
					if (_name === name) {
						$(this).removeClass(checkedClass)
					}
				});

				if ($.isFunction(radio.config.change)) {
					radio.config.change.call(radio,trigger,target)
				};
			};
			return radio;
		}
	};

	/**
	 * 可以传入一个obj
	 * config.name : radio的name，如果传入name，会优先使用name进行选择
	 * config.selector : radio的选择器，如果传入selector，会找到该selector下的相同name的input，进行渲染
	 * config.change : radio选择之后的回调
	 * config.tpl : radio的模板
	 * @return {[type]}        [description]
	 */
	function createRadios(config) {
		var name = config['name'],
			selector = config['selector'],
			change = config['change'],
			tpl = config['tpl'],
			radiolist = {}; // 存储所有create出的radio的对象

		if (name) {
			var radios = $('input[name='+name+']');
			radiolist[name] = []; // 使用name作为数组名，进行存储
			radios.each(function (index) {
				var _target = $(this),
					_id = _target.attr('id'),
					_value = _target.val(),
					_text = $.trim(_target.parent().text()),
					_disabled = this.disabled,
					_checked = this.checked,
					_radio = new Radios({
						'target' : _target,
						'value' : _value,
						'text' : _text,
						'id' : _id,
						'name' : name,
						'disabled' : _disabled,
						'checked' : _checked,
						'change' : change,
						'tpl' : tpl
					});

				radiolist[name].push(_radio);
			});
		} else if (selector) {
			var radios = $(selector);
			radios.each(function (index) {
				var _target = $(this),
					_id = _target.attr('id'),
					_value = _target.val(),
					_text = $.trim(_target.parent().text()),
					_name = _target.attr('name'),
					__disabled = this._disabled,
					_checked = this.checked,
					_radio = new Radios({
						'target' : _target,
						'value' : _value,
						'text' : _text,
						'id' : _id,
						'name' : _name,
						'disabled' : __disabled,
						'checked' : _checked,
						'change' : change,
						'tpl' : tpl
					});

				if ($.isArray(radiolist[_name])) {
					radiolist[_name].push(_radio);
				} else {
					radiolist[_name] = [];
					radiolist[_name].push(_radio);
				}
			});
		};

		return radiolist;
	};

	exports.createRadios = createRadios;
});