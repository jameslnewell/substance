(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{ub1y:function(e,t){e.exports=function(e){var t={className:"keyword",begin:"\\b[a-z\\d_]*_t\\b"},n={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\((?:.|\n)*?\)\1"/},{begin:"'\\\\?.",end:"'",illegal:"."}]},s={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},r={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(n,{className:"meta-string"}),{className:"meta-string",begin:/<[^\n>]*>/,end:/$/,illegal:"\\n"},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},i=e.IDENT_RE+"\\s*\\(",a={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},o=[t,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,s,n];return{aliases:["c","cc","h","c++","h++","hpp","hh","hxx","cxx"],keywords:a,illegal:"</",contains:o.concat([r,{begin:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",end:">",keywords:a,contains:["self",t]},{begin:e.IDENT_RE+"::",keywords:a},{variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:a,contains:o.concat([{begin:/\(/,end:/\)/,keywords:a,contains:o.concat(["self"]),relevance:0}]),relevance:0},{className:"function",begin:"("+e.IDENT_RE+"[\\*&\\s]+)+"+i,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:a,illegal:/[^\w\s\*&]/,contains:[{begin:i,returnBegin:!0,contains:[e.TITLE_MODE],relevance:0},{className:"params",begin:/\(/,end:/\)/,keywords:a,relevance:0,contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,n,s,t,{begin:/\(/,end:/\)/,keywords:a,relevance:0,contains:["self",e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,n,s,t]}]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,r]},{className:"class",beginKeywords:"class struct",end:/[{;:]/,contains:[{begin:/</,end:/>/,contains:["self"]},e.TITLE_MODE]}]),exports:{preprocessor:r,strings:n,keywords:a}}}}}]);