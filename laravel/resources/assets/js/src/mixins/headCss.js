export default {
    methods: {
        addCssClass: function(id, content) {
            const el = document.getElementById(id)
            if(el) return;

            const doc = window.document;
            const css = doc.createElement('style');
            const rule = document.createTextNode(content);

            css.id = id;
            css.type = 'text/css';
            css.appendChild(rule);
            doc.getElementsByTagName('head')[0].appendChild(css);
        },

        removeCssClass(id) {
            const el = document.getElementById(id);
            if(el) el.parentNode.removeChild(el);
        }
    }
}
