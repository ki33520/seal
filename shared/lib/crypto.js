module.exports = {
    base64: {
        settings: { // defaults
            "char62": "+",
            "char63": "/",
            "pad": "=",
            "ascii": false
        },
        encode: function(str) {
            this.char_set =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + this.settings.char62 + this.settings.char63;

            var output = ""; // final output
            var buf = ""; // binary buffer
            for (var i = 0; i < str.length; ++i) {
                var c_num = str.charCodeAt(i);
                if (this.settings.ascii)
                    if (c_num >= 256)
                        throw "Not an 8-bit char.";
                var c_bin = c_num.toString(2);
                while (c_bin.length < (this.settings.ascii ? 8 : 16))
                    c_bin = "0" + c_bin;
                buf += c_bin;

                while (buf.length >= 6) {
                    var sextet = buf.slice(0, 6);
                    buf = buf.slice(6);
                    output += this.char_set.charAt(parseInt(sextet, 2));
                }
            }

            if (buf) { // not empty
                while (buf.length < 6) buf += "0";
                output += this.char_set.charAt(parseInt(buf, 2));
            }

            if (this.settings.pad)
                while (output.length % (this.settings.ascii ? 4 : 8) != 0)
                    output += this.settings.pad;

            return output;
        },
        decode: function(str) {
            this.char_set =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + this.settings.char62 + this.settings.char63;

            var output = ""; // final output
            var buf = ""; // binary buffer
            var bits = (this.settings.ascii ? 8 : 16);
            for (var i = 0; i < str.length; ++i) {
                if (str[i] == this.settings.pad) break;
                var c_num = this.char_set.indexOf(str.charAt(i));
                if (c_num == -1) throw "Not base64.";
                var c_bin = c_num.toString(2);
                while (c_bin.length < 6) c_bin = "0" + c_bin;
                buf += c_bin;

                while (buf.length >= bits) {
                    var octet = buf.slice(0, bits);
                    buf = buf.slice(bits);
                    output += String.fromCharCode(parseInt(octet, 2));
                }
            }
            return output;
        }
    }
}