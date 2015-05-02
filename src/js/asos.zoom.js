/*globals jQuery, google, document */
(function ($) {
    "use strict";
    var pluginName  =   "asosZoom",
        defaults    =   {
            zoom: 'horizontal',
            speed: 500,
            thumbnails: true,
            closeButton: true,
            closeText: 'x',
            thumbnailPosition: 'vertical',
            onStart: function () {},
            onComplete: function () {},
            onCleanup: function () {},
            onClose: function () {},
            overlayColor: '#000000',
            overlayOpacity: '0.7',
            imageResize: null,
            containerWidth: '70%',
            containerHeight: '90%',
            nextText : '&gt;',
            prevText : '&lt;',
            nav : true
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element        =   element;
        this.$element       =   $(this.element);
        this.$body          =   $('body');
        this.options        =   options;
        this.metadata       =   this.$element.data('options');
        this.settings       =   $.extend({}, defaults, this.options, this.metadata);
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var that = this;
            this.bindEvents();
        },
        bindEvents: function () {
            var that = this;
            that.$element.on('click', function (e) {
                e.preventDefault();
                that.removeZoom();
                that.appendZoomHtml($(this).attr('href'), $(this).attr('rel'));
                that.showZoom();
                that.enableZoomActions();
                that.closingActions();
            });
        },
        showZoom: function () {
            $('#asosZoom__overlay')
                .css('background', this.settings.overlayColor)
                .fadeTo(0, this.settings.overlayOpacity);
            $('#asosZoom').fadeIn(this.settings.speed);
        },
        removeZoom: function () {
            $('#asosZoom').remove();
        },
        closingActions: function () {
            var that = this;
            $(document).off('click.asosZoom').on('click.asosZoom', '#asosZoom', function (e) {
                e.preventDefault();
                that.removeZoom();
            }).off('keydown.asosZoom').on('keydown.asosZoom', function (e) {
                if (e.keyCode === 27) {
                   that.removeZoom();
                }
            });
        },
        enableZoomActions: function () {
            var that = this;
            $('#asosZoom__content__img__xl').on('mousemove', function (e) {
                var fullWidth = $('#asosZoom__content__img__xl').width(),
                    fullHeight = $('#asosZoom__content__img__xl').height(),
                    contentWidth = $('#asosZoom__content').width(),
                    contentHeight = $('#asosZoom__content').height(),
                    offset = $('#asosZoom__content').offset(),
                    mouseX = e.pageX - offset.left,
                    mouseY = e.pageY - offset.top,
                    posX = (Math.round((mouseX / contentWidth) * 100) / 100) * (fullWidth - contentWidth),
                    posY = (Math.round((mouseY / contentHeight) * 100) / 100) * (fullHeight - contentHeight);
                if (that.settings.zoom === 'vertical') {
                    $('#asosZoom__content__img__xl').css('top', '-' + posY + 'px');
                } else if (that.settings.zoom === 'horizontal') {
                    $('#asosZoom__content__img__xl').css('left', '-' + posX + 'px');
                } else {
                    $('#asosZoom__content__img__xl').css({'top': '-' + posY + 'px', 'right': '' + posX + 'px'});
                }
            });
        },
        appendZoomHtml: function (fullImageUrl, imageRel) {
            var zoomHtml,
                zoomContainer,
                imageContainer,
                thumbContainer,
                zoomedImage;
            if (this.settings.imageResize === 'height') {
                zoomContainer = '<div id="asosZoom__content">';
            } else {
                zoomContainer = '<div id="asosZoom__content" style="max-width:' + this.settings.containerWidth + '; height:' + this.settings.containerHeight + '">';
            }
            zoomedImage = '<img id="asosZoom__content__img__xl" src="' + fullImageUrl + '" />';
            if (this.settings.thumbnails) {
                if (this.settings.thumbnailPosition === "vertical") {
                    thumbContainer = "zThumbsVertical";
                } else {
                    thumbContainer = "zThumbsHorizontal";
                }
                imageContainer = 'asosZoom__content__img';
                zoomHtml = '<div id="asosZoom"><div id="asosZoom__overlay"></div>' + zoomContainer + '<div id="' + imageContainer + '"></div><div id="asosZoom__content__thumbs" class="' + thumbContainer + '"></div></div></div>';
            } else {
                imageContainer = 'asosZoom__content';
                zoomHtml = '<div id="asosZoom"><div id="asosZoom__overlay"></div>' + zoomContainer + '</div></div>';
            }
            this.$body.append(zoomHtml);
            $('#' + imageContainer).append(zoomedImage);
            console.log(zoomHtml);
            console.log($('#' + imageContainer));
            if (imageRel && this.settings.nav) {
                this.appendThumbnails(imageRel);
            }
            if (this.settings.closeButton) {
                var closeBtn = '<a href="#" id="asosZoom__content__close">' + this.settings.closeText + '</a>';
                $('#asosZoom__content').append(closeBtn);
            }
        },
        appendThumbnails: function (imageRel) {
            var $thumbs = $('a[rel="' + imageRel + '"]');
            if ($thumbs.length > 1) {
                this.appendArrows();
                $thumbs.each(function () {
                    $('#asosZoom__content__thumbs').append('<a href="' + this.href + '" class="asosZoom-thumb"><img src="' + this.href + '" alt=""/></a>');
                });
            }
        },
        appendArrows: function () {
            var buttons = '<a href="#" id="asosZoom__content__next">' + this.settings.nextText + '</a><a href="#" id="asosZoom__content__prev">' + this.settings.prevText + '</a>';
            $('#asosZoom__content').append(buttons);
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));