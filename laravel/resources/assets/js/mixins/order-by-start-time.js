export default {
    methods: {
        sortCellItems: function(value) {
            if(value.length < 1) return value;

            //return value.slice().sort((a, b) => {
            return value.sort((a, b) => {

                if(a.type_id === 1 && b.type_id === 2) return 1;
                if(a.type_id === 2 && b.type_id === 1) return -1;
                if(a.type_id === 2 && b.type_id === 2) return 0;
    
                if( a.start_time === undefined || a.start_time === null ) return -1;
                if( b.start_time === undefined || b.start_time === null ) return 1;
    
                const aArr = a.start_time.split(':');
                const bArr = b.start_time.split(':');
    
                // sort by hour
                if (parseInt(aArr[0]) < parseInt(bArr[0])) return -1;
                if (parseInt(aArr[0]) > parseInt(bArr[0])) return 1;
    
                // sort by minits
                if (parseInt(aArr[1]) < parseInt(bArr[1])) return -1;
                if (parseInt(aArr[1]) > parseInt(bArr[1])) return 1;
    
                // the same value
                return 0;
            });
        }
    }
}
