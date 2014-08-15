WidgetNode = function( data, wl ){
    this._w = data;
    this._wl = wl;
};

WidgetNode.prototype = {
     prev: null
    ,next: null
    ,_w  : null
    ,_wl : null
    ,switchPrev : function(){
        if( this.prev ){
            var nextNode = this.prev;
            if( this.prev.prev ){
                this.prev.prev.next  = this;
            }
            if( this.next ){
                this.next.prev = this.prev
            }
            if( this.prev ){
                this.prev.next = this.next;
            }
            this.prev = this.prev.prev;
            this.next = nextNode;
            nextNode.prev = this;
            if( ! this.prev ){
                this._wl._head = this;
            }

            if( !this.next.next ){
                this._wl._tail = this.next;
            }
        }
    }
    ,switchNext: function(){
        if( this.next ){

            var prevNode = this.next;

            if( this.next.next ){
                this.next.next.prev  = this;
            }

            if( this.prev ){
                this.prev.next = this.next;
            }

            if( this.next ){
                this.next.prev = this.prev;
            }

            this.next = this.next.next;
            this.prev = prevNode;
            prevNode.next = this;

            if( ! this.next ){
                this._wl._tail = this;
            }

            if( !this.prev.prev ){
                this._wl._head = this.prev;
            }
        }
    }
};

WidgetList = function(){};
WidgetList.prototype = {
    _length: 0,
    _head:null,
    _tail:null,
    add: function ( data ){
        var node = new WidgetNode( data, this );
        if (this._length == 0) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this._length++;
    },
    remove: function( index ){
        //check for out-of-bounds values
        if (index > -1 && index < this._length){
            var current = this._head,
                i = 0;
            if (index === 0){
                this._head = current.next;

                if (!this._head){
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }
            } else if (index === this._length -1){
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {
                while(i++ < index){
                    current = current.next;
                }
                current.prev.next = current.next;
            }
            this._length--;
            return current.data;
        } else {
            return null;
        }
    },
    getNode : function( index ){
        var startBegining = index < (this._length / 2);
        var currentNode = startBegining ? this._head : this._tail;
        if(index >= 0 && index < this._length ){
            if (startBegining){
                console.log('Searching from begining');
                var i = 0;
                while(i++ < index){
                    currentNode = currentNode.next;
                }
            }else{
                console.log('Searching from end');
                var i = this._length-1;
                while(i-- > index){
                    currentNode = currentNode.prev;
                }
            }
            return currentNode;
        }else{
            console.log( 'ERROR :: node not found ('+index+')' );
            return false;
        }
    },
    switchPrev: function( index ) {
        if ( index > 0 ){
            var node = this.getNode(index);
            if ( node ){
                return node.switchPrev();
            }else{
                return false;
            }
        }else{
            console.log( 'ERROR :: unable to switch prev for node 0' );
            return false;
        }
    },
    switchNext: function( index ) {
        if ( index < this._length-1 ){
            var node = this.getNode(index);
            if ( node ){
                return node.switchNext();
            }else{
                return false;
            }
        }else{
            console.log( 'ERROR :: unable to switch next for node ' + (this._length-1) );
            return false;
        }
    },
    print: function(){
        var currentItem = this._head;
        var items = '';
        while( currentItem ){
            items += currentItem._w ;
            if( currentItem.next ){
                items += ' <-> ';
            }
            currentItem = currentItem.next;
        }
        return items;
    }
};