/**
 * checkbox
 *
 * build on seajs,jQuery
 *
 * 2014 03 02
 * by tobeyouth
 */
define(function (require,exports,module) {
	var defaultTpl = require('./tpl').tpl,
		defaultConfig = {
			'tpl' : defaultTpl,
			'target' : null,
			'check' : null,
			'cancel' : null,
			'hoverClass' : 'cf_checkbox_hover',
			'checkedClass' : 'cf_checkbox_checked'
		};

	function CheckBoxes(config) {
		this.config = $.extend({},defaultConfig,config);
		this.target = this.config.target;
		this.init();
	};

	CheckBoxes.prototype = {
		'constructor' : CheckBoxes,
		'init' : function () {
			var checkbox = this;

			checkbox.build();
			checkbox.bindEvent();

			return checkbox;
		},
		'build' : function () {
			var checkbox = this,
				render = template.compile(checkbox.config.tpl),
				html = render(checkbox.config),
				parentTagName = checkbox.target.parent().tagName.toLowerCase();

			checkbox.dom = $(html);

			if (parentTagName === 'label') {
				checkbox.target.parent('label').after(checkbox.dom);
				checkbox.target.parent('label').hide();
			} else {
				checkbox.target.after(checkbox.dom);
				checkbox.target.siblings('label').hide();
			};

			return checkbox;
		},
		'bindEvent' : function () {
			var checkbox = this,
				hoverClass = checkbox.config.hoverClass,
				checkedClass = checkbox.config.checkedClass;

			checkbox.dom.mouseover(function () {
				checkbox.dom.addClass(hoverClass);
			});
			checkbox.dom.mouseout(function () {
				checkbox.dom.removeClass(hoverClass);
			});
			checkbox.dom.click(function () {
				var isChecked = checkbox.dom.hasClass(checkedClass),
					data = {
						'trigger' : checkbox.dom,
						'target' : checkbox.target[0],
						'checkedClass' : checkedClass,
						'name' : checkbox.config.name
					}

				if (isChecked) {
					checkbox.cancel(data);
				} else {
					checkbox.check(data);
				};
			});

			return checkbox;
		},
		'check' : function (data) {
			var checkbox = this,
				trigger = data.trigger,
				target = data.target,
				checkedClass = data.checkedClass;

			trigger.addClass(checkedClass);
			target.checked = true;
			if ($.isFunction(checkbox.config.check)) {
				checkbox.config.check.call(checkbox,trigger,target);
			};

			return checkbox;
		},
		'cancel' : function (data) {
			var checkbox = this,
				trigger = data.trigger,
				target = data.target,
				checkedClass = data.checkedClass;

			trigger.removeClass(checkedClass);
			target.checked = false;

			if ($.isFunction(checkbox.config.cancel)) {
				checkbox.config.cancel.call(checkbox,trigger,target);
			};

			return checkbox;
		}
	};

	/**
	 * [createCheckbox description]
	 *
	 * config.name:会build所有相同name的checkbox
	 * config.selector:会build所有可以捕获到的selector元素
	 * 
	 * @return {[type]}        [description]
	 */
	function createCheckbox(config) {
		var name = config.name,
			selector = config.selector,
			check = config['check'],
			cancel = config['cancel'],
			tpl = config['tpl'],
			hoverClass = config['hoverClass'],
			checkedClass = config['checkedClass'],
			checkboxList = {};

		if (name) {
			var targets = $('input[name='+name+']'),
				parentTagName = checkbox.target.parent().tagName.toLowerCase();

			checkboxList[name] = [];
			targets.each(function (index) {
				var _target = $(this),
					_id = _target.attr('id'),
					_name = _target.attr('name'),
					_value = _target.val(),
					_text = parentTagName === 'label' ? _target.parent().text() : _target.siblings('label').text(),
					_checked = this.checked,
					_disabled = this.disabled,
					_checkbox = new CheckBoxes({
						'target' : _target,
						'id' : _id,
						'name' : _name,
						'value' : _value,
						'checked' : _checked,
						'disabled' : _disabled,
						'text' : _text,
						'check' : check,
						'cancel' : cancel,
						'tpl' : tpl,
						'hoverClass' : hoverClass,
						'checkedClass' : checkedClass
					});
				checkboxList[name].push(_checkbox);
			});
		} else if (selector) {
			var targets = $(selector),
				parentTagName = checkbox.target.parent().tagName.toLowerCase();

			targets.each(function (index) {
				var _target = $(this),
					_id = _target.attr('id'),
					_name = _target.attr('name'),
					_value = _target.val(),
					_text = parentTagName === 'label' ? _target.parent().text() : _target.siblings('label').text(),
					_checked = this.checked,
					_disabled = this.disabled,
					_checkbox = new CheckBoxes({
						'target' : _target,
						'id' : _id,
						'name' : _name,
						'value' : _value,
						'checked' : _checked,
						'disabled' : _disabled,
						'text' : _text,
						'check' : check,
						'cancel' : cancel,
						'tpl' : tpl,
						'hoverClass' : hoverClass,
						'checkedClass' : checkedClass
					});
				if ($.isArray(checkboxList[_name])) {
					checkboxList[_name].push(_checkbox);
				} else {
					checkboxList[_name] = [];
					checkboxList[_name].push(_checkbox);
				}
			});
		};

	};

	exports.createCheckbox = createCheckbox;
});