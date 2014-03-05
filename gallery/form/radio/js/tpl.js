/**
 * radio模板
 *
 * 2013 12 31
 *
 * by jn
 */
define(function (require,exports,module) {
	var tpl = 	'<div data-disabled="<%= disabled ? "disabled" : "" %>" class="cell_radio <%= disabled ? "cell_radio_disabled" : "" %> <%= checked ? "cell_radio_checked" : "" %>" data-name="<%= name %>" data-value="<%= value %>">' + 
					'<em class="icons"></em>' + 
					'<span class="text"><%= text %></span>' + 
				'</div>';

	exports.tpl = tpl;
});