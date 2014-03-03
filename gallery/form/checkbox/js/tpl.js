/**
 * checkbox的默认模板
 *
 * build on seajs,jQuery
 * 
 * 2014 03 02
 * by tobeyouth
 */
define(function (require,exports,module) {
	var tpl = 	'<div class="J_form_checkbox<%= disabled ? " J_form_checkbox_disabled" : "" %> <%= checked ? " J_form_checkbox_checked" : "" %>" data-id="<%= id %>" data-name="<%= name %>">'+
					'<em class="icons"></em>'+
					'<span class="text"><%= text %></span>' + 
				'</div>';

	exports.tpl = tpl;
})