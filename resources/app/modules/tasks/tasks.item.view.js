'use strict';

var TasksItemView,
    template = require('./hbs/tasks.item.hbs.html');

TasksItemView = Marionette.ItemView.extend({
    template  : template,
    className : 'tasks__item',

    modelEvents : {
        'change'        : 'render',
        'change:status' : '_changeStatus'
    },

    events : {
        'mousedown'          : '_dragstart',
        'click .tasks__link' : '_navigate'
    },

    getCoords : function (elem) {
        var box = elem[0].getBoundingClientRect();

        return {
            top  : box.top + pageYOffset,
            left : box.left + pageXOffset
        };

    },

    _navigate : function (e) {
        e.preventDefault();

        App.appRouter.navigate('/task/' + this.model.get('_id'), {trigger : true});
    },

    _dragstart : function (e) {
        if (e.which != 1) return;

        this.dragObj = {
            elem  : this.$el,
            downX : e.pageX,
            downY : e.pageY
        };

        $(document).on('mousemove.dragndrop', $.proxy(this._dragMove, this));

        $(document).on('keyup.dragndrop', $.proxy(this._dragCancel, this));
        $(document).on('mouseup.dragndrop', $.proxy(this._dragStop, this));
    },

    _dragStop : function (e) {
        $(document).off('mousemove.dragndrop');
        $(document).off('mouseup.dragndrop');
        $(document).off('keyup.dragndrop');

        $('.layout').mod('drag', false);
        this.dragObj.elem.mod('dragged', false);

        if (this.dragObj.$avatar) {
            this._finishDrag(e);
        }

        if (this.dragObj.$avatar) {
            this.dragObj.$avatar.remove();
        }

        this.dragObj = {};
    },

    _dragCancel : function (e) {
        if (e.keyCode == 27) return this._dragStop(e);
    },

    _dragMove : function (e) {
        var $avatar, coords,
            moveX, moveY;

        $avatar = this.dragObj.$avatar;

        if (!$avatar) {

            moveX = e.pageX - this.dragObj.downX;
            moveY = e.pageY - this.dragObj.downY;

            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            $avatar = this.dragObj.elem.clone()
                .mod('avatar', true)
                .width(this.dragObj.elem.width())
                .appendTo('body');

            $('.layout').mod('drag', 'active');
            this.dragObj.elem.mod('dragged', true);

            coords = this.getCoords(this.dragObj.elem);

            this.dragObj.shiftX = this.dragObj.downX - coords.left;
            this.dragObj.shiftY = this.dragObj.downY - coords.top;

            this.dragObj.$avatar = $avatar;
        }

        $avatar.css({
            left : e.pageX - this.dragObj.shiftX,
            top  : e.pageY - this.dragObj.shiftY
        });

        return false;
    },


    _finishDrag : function (e) {
        var statusId,
            $dropElem;

        $dropElem = this._findDroppable(e);

        if ($dropElem.length > 0) {
            statusId = $dropElem.attr('data-status-id');

            $dropElem.append(this.dragObj.elem);
            this.model.set({status : statusId});
        }
    },

    _findDroppable : function (e) {
        var elem,
            $droppable;

        this.dragObj.$avatar.hide();

        elem = document.elementFromPoint(e.clientX, e.clientY);
        $droppable = $(elem).closest('.tasks__col');

        return $droppable;
    },


    _changeStatus : function () {

        var loading,
            loaded;

        loading = _.debounce(function () {
            if (loaded) {
                return;
            }
            this.$el.addClass('loading');
        }.bind(this), 100);

        loading();

        this.model.save({
                status : this.model.get('status')
            },
            {
                patch   : true,
                success : function () {
                    loaded = true;

                    this.$el.removeClass('loading');
                    this.triggerMethod('change:status');

                }.bind(this),

                error : function (view, res) {
                    this.$el.removeClass('loading');

                    console.warn(res.status + ' ' + res.statusText);
                    console.log(JSON.parse(res.responseText));

                    this.triggerMethod('change:rollback:dom');
                }.bind(this)
            });
    }

});

module.exports = TasksItemView;