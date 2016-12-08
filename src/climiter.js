;(function($) {
    var climiter = function(){

    };

    climiter.prototype.init = function(tolimit, options){
        var base = this;

        base.$tolimit = tolimit;
        base.options = options;

        base.$tolimit.keyup(function(e){
            var chars = base.$tolimit.val().length;

            if ((base.options.char_limit - chars < 0 && true === base.options.force))
            {
                base.$tolimit.val( base.$tolimit.val().substr(0,base.options.char_limit) );
                var chars = base.$tolimit.val().length;
            }

            base.updateText();
        });

        base.setupText();

        base.$counter = base.$tolimit.parent('div').find('.climiterCounter');

        base.updateText();
    };

    climiter.prototype.numChars = function(){
        var base = this;
        return base.$tolimit.val().length;
    };

    climiter.prototype.setupText = function(){
        var base = this;
        base.$tolimit.wrap('<div style="position: relative;"></div>')
                .after('<span style="position: absolute; bottom: 0;right: 0;" class="climiterCounter"></span>');

    };

    climiter.prototype.updateText = function(){
        var base = this;

        var chars_left = base.options.char_limit - base.numChars();
        base.$counter.html(chars_left+' character remaining');
    };

    // plugin
    $.fn.climiter = function(options) {		
        var defaults = {
            char_limit : 200,
            force : true
        };
                
        var options =  $.extend(true, defaults, options);
        
		return this.each(function() {
            var this_options = options;
            
            if (!isNaN($(this).data('limit')))
            {
                this_options.char_limit = $(this).data('limit');
            }

            if (true === $(this).data('force_limit') || false === $(this).data('force_limit'))
            {
                this_options.force = $(this).data('force_limit');
            }

            if ($(this).data('climiterInit') === true)
            {
                var climiterInst = $(this).data('climiter');
            }
            else
            {
                $(this).data('climiterInit', true);
                var climiterInst = new climiter();
                $(this).data('climiter', climiterInst);
                climiterInst.init($(this), options);
            }
            
            return climiterInst;
		});
    };
})(jQuery);