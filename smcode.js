/*  ===========================================================================
 *  
 *  File:       smcode.js
 *  Version:    2.0.40
 *  Date:       August 2024
 *  Author:     Stefano Mengarelli  
 *  E-mail:     info@stefanomengarelli.it
 *  
 *  Copyright (C) 2010-2024 by Stefano Mengarelli - All rights reserved - Use, 
 *  permission and restrictions under license.
 *
 *  SMCode javascript support library.
 *  
 *  MIT License
 *  ===========
 *  SMCode Javascript Rapid Application Development Code Library
 *  Copyright (c) 2010-2024 Stefano Mengarelli - All rights reserved.
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *  ===========================================================================
 */

/*  ===========================================================================
 *  SMCode support library class
 *  ===========================================================================
 */
class SMCode {

    // Attribute prefix.
    attributePrefix = 'sm-';

    // Base-64 hidden element suffix.
    base64Suffix = '_b64';

    // Class prefix.
    classPrefix = 'sm-';

    // Decimal point.
    decimalPoint = ',';

    // Last error code.
    errorCode = 0;

    // Last error message.
    errorMessage = '';

    // Main container id.
    mainContainer = 'SM_MAIN';

    // No element suffix.
    noElementSuffix = '_no';

    // Current state JSON.
    state = {};

    // Thousands separator. 
    thousandsSeparator = '.';

    // Instance constructor.
    constructor() {

    }

    // Returns absolute value of number n.
    abs(_val) {
        _val = this.toVal(_val);
        if (_val < 0) return -_val;
        else return _val;
    }

    // Returns part of string after first recourrence of sub string.
    // If sub string is not present returns empty string.
    after(_val, _find) {
        var i;
        _val = this.toStr(_val);
        _find = this.toStr(_find);
        i = _val.indexOf(_find);
        if (i < _val.length - _find.length) return _val.substr(i + _find.length);
        else return '';
    }

    // Call URL via jQuery ajax function and is succeed perform success function.
    ajax(_url, _success) {
        $.ajax({
            type: "GET",
            url: _url,
            success: _success
        });
    }

    // Return decoded base 64 value.
    base64Decode(_val) {
        try {
            if (_val === undefined) return '';
            else if (_val == null) return '';
            else if (('' + _val).trim().length > 0) return decodeURIComponent(escape(window.atob(_val)));
            else return '';
        }
        catch {
            return '';
        }
    }

    // Return value encoded base 64.
    base64Encode(_val) {
        try {
            if (_val === undefined) return '';
            else if (_val == null) return '';
            else if (('' + _val).trim().length > 0) return window.btoa(unescape(encodeURIComponent(_val)));
            else return '';
        }
        catch {
            return '';
        }
    }

    // Returns part of string before first recurrence of substring.
    // If substring is not present returns empty string.
    before(_val, _find) {
        var i = _val.indexOf(_find);
        if (i > 0) return _val.substr(0, i);
        else return '';
    }

    // Returns part of string between start and end substrings.
    btw(_val, _start, _end, _ignoreCase = false) {
        var rslt = '', s, i;
        if (_ignoreCase) i = _val.toLowerCase().indexOf(_start.toLowerCase());
        else i = _val.indexOf(_start);
        if (i > -1) {
            s = this.mid(_val, i + _start.length);
            if (_ignoreCase) i = s.toLowerCase().indexOf(_end.toLowerCase());
            else i = s.indexOf(_end);
            if (i > -1) rslt = this.mid(s, 0, i);
        }
        return rslt;
    }

    // Returns string passed adding new string divided by separator.
    cat(_val, _new, _separator = '') {
        if (_new.length < 1) return _val;
        else if (_val.length > 0) return _val + _separator + _new;
        else return _new;
    }

    // Return true if selected control is checked.
    checked(_sel, _checked = null) {
        _sel = this.select(_sel);
        if (_sel && _sel.length) {
            if (_checked == null) return _sel.is(':checked');
            else {
                _checked = this.toBool(_checked);
                _sel.prop('checked', _checked);
                return _checked;
            }
        }
        else return false;
    }

    // Return first string not null or empty string if not found.
    coalesce(_p0, _p1, _p2, _p3, _p4, _p5, _p6, _p7, _p8, _p9, _p10, _p11, _p12, _p13, _p14, _p15) {
        if ((_p0 != undefined) && (_p0 != null)) return _p0;
        else if ((_p1 != undefined) && (_p1 != null)) return _p1;
        else if ((_p2 != undefined) && (_p2 != null)) return _p1;
        else if ((_p3 != undefined) && (_p3 != null)) return _p1;
        else if ((_p4 != undefined) && (_p4 != null)) return _p1;
        else if ((_p5 != undefined) && (_p5 != null)) return _p1;
        else if ((_p6 != undefined) && (_p6 != null)) return _p1;
        else if ((_p7 != undefined) && (_p7 != null)) return _p1;
        else if ((_p8 != undefined) && (_p8 != null)) return _p1;
        else if ((_p9 != undefined) && (_p9 != null)) return _p1;
        else if ((_p10 != undefined) && (_p10 != null)) return _p1;
        else if ((_p11 != undefined) && (_p11 != null)) return _p1;
        else if ((_p12 != undefined) && (_p12 != null)) return _p1;
        else if ((_p13 != undefined) && (_p13 != null)) return _p1;
        else if ((_p14 != undefined) && (_p14 != null)) return _p1;
        else if ((_p15 != undefined) && (_p15 != null)) return _p1;
    }

    // Expire cookie by name.
    cookieExpire(_cookie) {
        return cookieWrite(_cookie, '', -1);
    }

    // Returns value of cookie by name.
    cookieRead(_cookie) {
        if (document.cookie) {
            var id = _cookie + '=', ar = document.cookie.split(';'), i = 0, c, r = '';
            while ((r == '') && (i < ar.length)) {
                c = ar[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(id) == 0) r = c.substring(id.length, c.length);
                i++;
            }
            return r;
        }
        else return '';
    }

    // Write value on cookie by name with expiration days.
    cookieWrite(_cookie, _val, _days) {
        if (document.cookie) {
            var xp = '';
            if (_days) {
                var d = new Date();
                d.setTime(d.getTime() + _days * 86400000);
                xp = '; expires=' + d.toGMTString();
            }
            document.cookie = _cookie + '=' + _val + xp + '; path=/';
        }
        return void (0);
    }

    // Returns new date with year, month and day.
    date(_year, _month, _day, _hours = 0, _minutes = 0, _seconds = 0) {
        return new Date(this.toVal(_year), this.toVal(_month), this.toVal(_day),
            _hours, _minutes, _seconds);
    }

    // Returns day value of date.
    dateDay(_date) {
        return _date.getDate();
    }

    // Returns day of week of date.
    dateDayOfWeek(_date) {
        var r = _date.getDay();
        if (r < 1) return 7;
        else return r;
    }

    // Returns month value of date.
    dateMonth(_date) {
        return _date.getMonth() + 1;
    }

    // Returns year value of date.
    dateYear(_date) {
        return _date.getFullYear();
    }

    // Returns true if string is null, empty or contains only spaces.
    empty(_val) {
        if (_val === undefined) return true;
        else if (_val == null) return true;
        else if (this.toStr(_val).trim().length < 1) return true;
        else return false;
    }

    // Return true if element selected is enabled or set enabled if specified.
    enabled(_sel, _enabled = null) {
        _sel = this.select(_sel);
        if (_sel && _sel.length) {
            if (_enabled == null) {
                return !_sel.attr('disabled') && !_sel.hasClass(this.classPrefix + 'disabled');
            }
            else {
                if (this.toBool(_enabled)) {
                    this.select("*" + _sel.attr("id")).each(function () {
                        this.attr('disabled', true);
                        this.addClass(this.classPrefix + 'disabled');
                    });
                }
                else {
                    this.select("*" + _sel.attr("id")).each(function () {
                        this.attr('disabled', false);
                        this.removeClass(this.classPrefix + 'disabled');
                    });
                }
            }
        }
    }

    // Set last error message and code.
    error(_errmsg = '', _errcode = -1) {
        if (_errmsg == '') {
            this.errorMessage = '';
            this.errorCode = 0;
        }
        else {
            this.errorMessage = _errmsg
            this.errorCode = _errcode;
        }
    }

    // Returns value with all carriage-return and tabs replaced by spaces.
    flat(_val) {
        _val = _val.replaceAll("\t", " ").replaceAll("\r\n", " ").replaceAll("\r", " ").replaceAll("\n", " ");
    }

    // Returns value formatted.
    format(_val, _fmt) {
        _val = this.toVal(_val);
        if (_fmt === undefined) return _val;
        else if (_fmt == null) return _val;
        else {
            return _val;
        }
    }
    
    // Returns decimal part of number.
    frac(_val) {
        _val = this.toVal(_val);
        return _val - Math.floor(_val);
    }

    // Return object from parsing JSON string.
    fromJson(_json) {
        if (_json) {
            if (_json.length < 1) return null;
            else return JSON.parse(_json);
        }
        else return null;
    }

    // Return object from parsing JSON base 64 string.
    fromJson64(_json64) {
        return this.fromJson(this.base64Decode(_json64));
    }

    // Return value of selected control as string. If specified combo selected option text will be returned.
    get(_sel, _comboOptionText = false) {
        var ty, id;
        _sel = this.select(_sel);
        if (_sel && _sel.length) {
            id = _sel.attr('id');
            ty = ('' + _sel.attr(this.attributePrefix + 'type')).trim().toUpperCase();
            if (ty.startsWith('YES')) {
                if (_sel.is(':checked')) return '1';
                else if ($('#' + id + this.noElementSuffix).is(':checked')) return '0';
                else return '';
            }
            else if (ty == 'CHECK') {
                if (_sel.is(':checked')) return '1';
                else return '0';
            }
            else if (_comboOptionText && (ty == 'COMBO')) {
                return $('#' + id + ' option:selected').text();
            }
            else return '' + _sel.val();
        }
        else return '';
    }

    // Return value of selected control as boolean.
    getBool(_sel) {
        return this.toBool(this.get(_sel));
    }

    // Return DOM element by id or null if not found.
    getDOM(_id) {
        if (document.getElementById) {
            return document.getElementById(_id);
        }
        else return null;
    }

    // Return value of attribute of element corresponding to selection.
    getAttr(_sel, _attr) {
        _sel = this.select(_sel);
        if (_sel && _sel.length) return _sel.attr(_attr);
        else return '';
    }

    // Return value of attrib sm-format of element corresponding to selection.
    getFormat(_sel) {
        return this.getAttr(sel, this.attributePrefix + 'format');
    }

    // Return value of selected control as integer.
    getInt(_sel) {
        return this.toInt(this.get(_sel));
    }

    // Return JSON string with key setted to value.
    getJson(_json, _key, _default = '') {
        var obj = this.fromJson(_json);
        if (obj == null) return _default;
        else return this.toStr(obj[_key]);
    }

    // Return JSON string with key setted to value.
    getJson64(_json64, _key, _default = '') {
        var obj = this.fromJson64(_json64);
        if (obj == null) return _default;
        else return this.toStr(obj[_key]);
    }

    // Return value of attrib sm-type of element corresponding to selection.
    getType(_sel) {
        return ('' + this.getAttr(sel, this.attributePrefix + 'type')).trim().toUpperCase();
    }

    // Return value of selected control as float.
    getVal(_sel) {
        return this.toVal(this.get(_sel));
    }

    // Evaluate test is true or false and return corresponding parameter.
    iif(_test, _ifTrue, _ifFalse) {
        if (test == true) return _ifTrue;
        else return _ifFalse;
    }

    // Insert new value between start and end substrings.
    insBtw(_val, _new, _start, _end, _ignoreCase = false) {
        var i, a, b;
        if (_ignoreCase) i = _val.toLowerCase().indexOf(_start.toLowerCase());
        else i = _val.indexOf(_start);
        if (i > -1) {
            a = this.mid(_val, 0, i) + _start + _new;
            b = this.mid(_val, i + _start.length, _val.length);
            if (_ignoreCase) i = b.toLowerCase().indexOf(_end.toLowerCase());
            else i = b.indexOf(_end);
            if (i > -1) return a + this.mid(b, i, b.length);
            else return _val;
        }
        else return _val + _start + newstring + _end;
    }

    // Returns integer part of number.
    int(_val) {
        try {
            if (_val) {
                if (isNaN(_val)) {
                    _value = ('' + _value).trim();
                    if (_value.length < 1) return 0;
                    else return parseInt(_value);
                }
                else return Math.floor(0 + _val);
            }
            else return 0;
        }
        catch {
            return 0;
        }
    }

    // Return  true if object is a jQuery instance.
    isJQuery(_obj) {
        if (_obj === undefined) return false;
        else if (_obj == null) return false;
        else return _obj instanceof jQuery;
    }

    // Return language code of client browser (it, en, de, fr, nl).
    language() {
        var s = "";
        if (navigator.language) s = navigator.language.toLowerCase();
        else if (navigator.userLanguage) s = navigator.userLanguage.toLowerCase();
        else if (navigator.browserLanguage) s = navigator.browserLanguage.toLowerCase();
        if (s.indexOf('it') > -1) return 'it';
        else if (s.indexOf('en') > -1) return 'en';
        else if (s.indexOf('de') > -1) return 'de';
        else if (s.indexOf('fr') > -1) return 'fr';
        else if (s.indexOf('nl') > -1) return 'nl';
        else return 'en';
    }

    // Returns first length characters of string from left.
    left(_val, _len) {
        _val = this.toStr(_val);
        _len = this.toVal(_len);
        if (_len > _val.length) _len = _val.length;
        if (_len > 0) return _val.substr(0, _len);
        else return "";
    }

    //	Returns length of string.
    len(_val) {
        return this.toStr(_val).length;
    }

    // Return string converted to lower-case.
    lower(_val) {
        return this.toStr(_val).toLowerCase();
    }

    // Returns portion of string starting at position index and getting length chars.
    mid(_val, _start, _len = null) {
        if (_len == null) _len = _val.length;
        else _len = this.toVal(_len);
        if (_val.length > 0) {
            if (_len > 0) {
                if (_start < 0) _start = 0;
                if (_start < _val.length) {
                    if (_start + _len > _val.length) return _val.substr(_start);
                    else return _val.substr(_start, _len);
                }
                else return '';
            }
            else return '';
        }
        else return '';
    }

    // Returns current date-time.
    now() {
        return new Date();
    }

    // Returns string filled at left with char until length.
    padL(_val, _len, _char = ' ') {
        _val = this.toStr(_val);
        _len = this.toVal(_len);
        _char = this.toStr(_char);
        if (_char.length < 1) _char = ' ';
        else if (_char.length > 1) _char = _char.substr(0, 1);
        while (_val.length < _len) _val = _char + _val;
        return _val;
    }

    // Returns string filled at right with char until length.
    padR(_val, _len, _char = ' ') {
        _val = this.toStr(_val);
        _len = this.toVal(_len);
        _char = this.toStr(_char);
        if (_char.length < 1) _char = ' ';
        else if (_char.length > 1) _char = _char.substr(0, 1);
        while (_val.length < _len) _val = _val + _char;
        return _val;
    }

    // Return position of substring to find in value.
    pos(_val, _find) {
        return this.toStr(_val).indexOf(this.toStr(_find));
    }

    // Print current page.
    print() {
        window.print();
    }

    // Return value with single quote.
    quote(_val) {
        return "'" + _val.replaceAll("'", "''") + "'";
    }

    // Return value with double quote.
    quote2(_val) {
        return '"' + _val.replaceAll('"', '""') + '"';
    }

    // If first selected control is checked set all other control to unchecked.
    radio(_sel, _sel2 = null, _sel3 = null, _sel4 = null,
        _sel5 = null, _sel6 = null, _sel7 = null, _sel8 = null,
        _sel9 = null, _sel10 = null, _sel11 = null, _sel12 = null,
        _sel13 = null, _sel14 = null, _sel15 = null, _sel16 = null) {
        if (this.checked(_sel)) {
            if (_sel2 != null) this.checked(_sel2, false);
            if (_sel3 != null) this.checked(_sel3, false);
            if (_sel4 != null) this.checked(_sel4, false);
            if (_sel5 != null) this.checked(_sel5, false);
            if (_sel6 != null) this.checked(_sel6, false);
            if (_sel7 != null) this.checked(_sel7, false);
            if (_sel8 != null) this.checked(_sel8, false);
            if (_sel9 != null) this.checked(_sel9, false);
            if (_sel10 != null) this.checked(_sel10, false);
            if (_sel11 != null) this.checked(_sel11, false);
            if (_sel12 != null) this.checked(_sel12, false);
            if (_sel13 != null) this.checked(_sel13, false);
            if (_sel14 != null) this.checked(_sel14, false);
            if (_sel15 != null) this.checked(_sel15, false);
            if (_sel16 != null) this.checked(_sel16, false);
        }
    }

    // Redirect to url.
    redir(url) {
        if (window.location) window.location = url;
        else document.location = url;
    }

    // Reload current page.
    reload() {
        if (location) location.reload();
    }

    // Returns string replacing all old string occurrences with new string.
    replace(_val, _old, _new) {
        return this.toStr(_val).replaceAll(_old, _new);
    }

    // Returns last length characters (from right) of string.
    right(_val, _len) {
        _val = this.toStr(_val);
        _len = this.toVal(_len);
        if (_len < 1) return '';
        else if (_val.length > _len) return _val.substr(_val.length - _len, _len);
        else return _val;
    }

    // Returns random number between 0 and _val.
    rnd(_val) {
        return Math.floor(Math.random() * (this.toVal(_val) + 1));
    }

    // Return object by jquery selector or by following special chars:
    // !{id} or ?{id} --> sm-id="{id}"
    // @{alias} --> sm-alias="{alias}"
    // ${field} --> sm-field="{field}"
    // *{field} --> sm-for="{field}"
    // *ERR{field} --> sm-for-error="{field}"
    // *LBL{field} --> sm-for-label="{field}"
    // *VAL{field} --> sm-for-validate="{field}"
    select(_sel) {
        if (_sel === undefined) return null;
        else if (_sel == null) return null;
        else if (_sel instanceof jQuery) return _sel;
        else {
            _sel = ('' + _sel).trim();
            if (_sel.length < 1) return '';
            else if (_sel.startsWith('!') || _sel.startsWith('?')) {
                _sel = "[" + this.attributePrefix + "id='" + _sel.substr(1) + "']";
            }
            else if (_sel.startsWith('@')) {
                _sel = "[" + this.attributePrefix + "alias='" + _sel.substr(1) + "']";
            }
            else if (_sel.startsWith('$')) {
                _sel = "[" + this.attributePrefix + "field='" + _sel.substr(1) + "']";
            }
            else if (_sel.startsWith('*ERR:')) {
                _sel = "[" + this.attributePrefix + "for-error='" + _sel.substr(5) + "']";
            }
            else if (_sel.startsWith('*LBL:')) {
                _sel = "[" + this.attributePrefix + "for-label='" + _sel.substr(5) + "']";
            }
            else if (_sel.startsWith('*VAL:')) {
                _sel = "[" + this.attributePrefix + "for-validate='" + _sel.substr(5) + "']";
            }
            else if (_sel.startsWith('*')) {
                _sel = "[" + this.attributePrefix + "for='" + _sel.substr(1) + "']";
            }
            return $(_sel);
        }
    }

    // Set value of selected control and related hidden base-64 element.
    set(_sel, _val) {
        var b64, id, no, ty;
        _sel = this.select(_sel);
        if (_sel && _sel.length) {
            id = _sel.attr('id');
            b64 = $('#' + id + this.base64Suffix);
            ty = ('' + _sel.attr(this.attributePrefix + 'type')).trim().toUpperCase();
            if (ty.startsWith('YES')) {
                no = $('#' + id + this.noElementSuffix);
                if (this.empty(_val)) {
                    _sel.prop('checked', false);
                    no.prop('checked', false);
                    if (b64 && b64.length) b64.val(this.base64Encode(''));
                }
                else if (this.toBool(_val)) {
                    _sel.prop('checked', true);
                    no.prop('checked', false);
                    if (b64 && b64.length) b64.val(this.base64Encode('1'));
                }
                else {
                    _sel.prop('checked', false);
                    no.prop('checked', true);
                    if (b64 && b64.length) b64.val(this.base64Encode('0'));
                }
            }
            else if (ty.startsWith('CHECK')) {
                if (this.toBool(_val)) {
                    _sel.prop('checked', true);
                    if (b64 && b64.length) b64.val(this.base64Encode('1'));
                }
                else {
                    _sel.prop('checked', false);
                    if (b64 && b64.length) b64.val(this.base64Encode('0'));
                }
            }
            else {
                _sel.val(this.format(_val, _sel.attr(this.attributePrefix + 'format')));
                if (b64 && b64.length) b64.val(this.base64Encode(_val));
            }
            return true;
        }
        else return false;
    }

    // Set hidden base-64 element value as related control.
    setBase64(_sel) {
        _sel = this.select(_sel);
        if (_sel && _sel.length) {
            b64 = $('#' + _sel.attr('id') + this.base64Suffix);
            if (b64 && b64.length) b64.val(this.base64Encode(get(_sel)));
        }
    }

    // Return JSON string with key setted to value.
    setJson(_json, _key, _val) {
        var obj = this.fromJson(_json);
        if (obj == null) {
            obj = {};
            obj[_key] = _val;
        }
        else obj[_key] = _val;
        return this.toJson(obj);
    }

    // Return JSON string with key setted to value.
    setJson64(_json64, _key, _val) {
        var obj = this.fromJson64(_json64);
        if (obj == null) {
            obj = {};
            obj[_key] = _val;
        }
        else obj[_key] = _val;
        return this.toJson64(obj);
    }

    // Convert value to boolean.
    toBool(_val) {
        try {
            if (_val === undefined) return false;
            else if (_val == null) return false;
            else {
                _val = (_val + '0').trim().toUpperCase().charAt(0);
                return (_val == '1') || (_val == 'T') || (_val == 'Y') || (_val == 'V') || (_val == 'S') || (_val == '+');
            }
        }
        catch {
            return false;
        }
    }

    // Return value with esplicit HTML entities.
    toHtml(_val, _notIfStartWith = null) {
        try {
            if (_val === undefined) return '';
            else if (_val == null) return '';
            else {
                _val = this.toStr(_val);
                if (_notIfStartWith != null) {
                    if (_val.startsWith(_notIfStartWith)) {
                        if (_val.length > _notIfStartWith.length) return _val.substr(_notIfStartWith.length);
                        else return '';
                    }
                }
                if (_val.trim().length > 0) {
                    return _val.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
                        return '&#' + i.charCodeAt(0) + ';';
                    }).replaceAll('"', '&quot;').replaceAll("'", '&apos;');
                }
                else return _val;
            }
        }
        catch {
            return '';
        }
    }

    // Convert to integer value.
    toInt(_val) {
        return Math.floor(this.toVal(_val));
    }

    // Return object converted to JSON string.
    toJson(_obj) {
        try {
            if (_obj === undefined) return '[]';
            else if (_obj == null) return '[]';
            else if (typeof _obj === 'object') return JSON.stringify(_obj);
            else return JSON.stringify({ _obj });
        }
        catch {
            return '[]';
        }
    }

    // Return object converted to JSON string base 64 encoded.
    toJson64(_obj) {
        return this.base64Encode(this.toJson(_obj));
    }

    // Convert value to string.
    toStr(_val) {
        try {
            if (_val === undefined) return '';
            else if (_val == null) return '';
            else if (_val instanceof jQuery) return '' + _val.val();
            else return '' + _val;
        }
        catch {
            return '';
        }
    }

    // Convert to float value.
    toVal(_val) {
        try {
            if (_val === undefined) return 0;
            else if (_val == null) return 0;
            else {
                _val = parseFloat(this.toStr(_val).replaceAll(this.thousandsSeparator, '').replaceAll(this.decimalPoint, '.'));
                if (isNaN(_val)) return 0;
                else return _val;
            }
        }
        catch {
            return 0;
        }
    }

    // Returns value trimming all occurrences of string at begin or end.
    trim(_val, _str = ' ') {
        while (this.left(_val, _str.length) == _str) _val = this.right(_val, _val.length - _str.length);
        while (this.right(_val, _str.length) == _str) _val = this.left(_val, _val.length - _str.length);
        return _val;
    }

    // Returns value trimming all occurrences of string at start.
    trimStart(_val, _str = ' ') {
        while (this.left(_val, _str.length) == _str) _val = this.right(_val, _val.length - _str.length);
        return _val;
    }

    // Returns value trimming all occurrences of string at end.
    trimEnd(_val, _str = ' ') {
        while (this.right(_val, _str.length) == _str) _val = this.left(_val, _val.length - _str.length);
        return _val;
    }

    // Returns value without HTML tags.
    untag(_val) {
        return ('' + _val).replace(/<[^>]*>/g, ' ');
    }

    // Return string converted to upper-case.
    upper(_val) {
        return this.toStr(_val).toUpperCase();
    }

    // Return true if element selected is visible or set visibility if specified.
    visible(_sel, _enabled = null) {
        _sel = this.select(_sel);
        if (_sel && _sel.length) {
            if (_enabled == null) {
                var r = true;
                while (r && (_sel && _sel.length)) {
                    if (_sel.attr('id') != this.mainContainer) {
                        if ((_sel.css('display') == 'none') || _sel.hasClass(this.classPrefix + 'hidden')) r = false;
                        _sel = _sel.parent();
                    }
                    else break;
                }
                return r;
            }
            else {
                if (this.toBool(_enabled)) {
                    this.select("*" + _sel.attr("id")).each(function () {
                        this.removeClass(this.classPrefix + 'hidden');
                    });
                    return true;
                }
                else {
                    this.select("*" + _sel.attr("id")).each(function () {
                        this.addClass(this.classPrefix + 'hidden');
                    });
                    return false;
                }
            }
        }
    }

    // Stop execution for specified seconds.
    waitSecs(_val) {
        var r = 0;
        _val = Math.floor(this.toVal(_val) * 1000) + (new Date()).getTime();
        while ((new Date()).getTime() < s) r++;
        return r;
    }

}

/*  ===========================================================================
 *  Globals
 *  ===========================================================================
 */

// SMCode support library main instance
var SM = new SMCode();