const
 DATA_PROTOCOL_PREFIX = 'data:',
 HTTPS_PROTOCOL_PREFIX = 'https:',
 DIRECTORY_SLASH = '/',
 CORE_HOST = 'core.parts',
 CORE_VARIABLE_WORD_LIST = "operation source string content-type",
 DEFAULT_CONTENT_TYPE = 'text/plain',
 DEFAULT_PARAMETER_STRING = '=US-ASCII',
 JS_RESERVED_WORD_LIST = "instanceof typeof break do new var case else return void catch finally continue for switch while this with debugger function throw default if try delete in",
 VARIABLES_WORD = 'variables',
 OPERATIONS_WORD = 'operations',
 WORDS_WORD = 'words',
 DATA_URI_PARAMETER_DELIM = ';',
 CONFIG_ASSIGN_DELIM = '=',
 SAFETY_MAX = 100,

 FILE_SYSTEM_SLASH = DIRECTORY_SLASH + DIRECTORY_SLASH,
 CORE_URL = HTTPS_PROTOCOL_PREFIX + FILE_SYSTEM_SLASH + CORE_HOST + DIRECTORY_SLASH,
 VARIABLE_SET_URL = CORE_URL + VARIABLES_WORD + DIRECTORY_SLASH,
 OPERATION_SET_URL = CORE_URL + OPERATIONS_WORD + DIRECTORY_SLASH,
 [OPERATION_VARIABLE_URL, SOURCE_VARIABLE_URL, STRING_VARIABLE_URL, CONTENT_TYPE_VARIABLE_URL] = CORE_VARIABLE_WORD_LIST.split(' ').map(word => VARIABLE_SET_URL + word),
 RESERVED_WORDS = [VARIABLES_WORD, WORDS_WORD, ...JS_RESERVED_WORD_LIST.split(' ')],
 [WORD_PATTERN, DATA_URI_PATTERN] = [`^${VARIABLE_SET_URL.replace('.', '\\.')}((?:[a-zA-Z$_]+[0-9]*)+)$`, `^data:([-\w]+\/[-+\w.]+)?(;?\w+=[-\w]+)*(;?base64)?,(.*)$`].map(string => new RegExp(string)),
 QUERY_CACHE = {
  'https://core.parts/': '?operation=add&a=data:operation=parseInt,2&source=data:text/javascript;base64,dGhyb3cgImNvbW1hbmQgbm90IGZvdW5kIg',
  'https://core.parts/operations/add': '?a=data:operation=parseInt,1&b=data:operation=parseInt,2&source=data:text/javascript;base64,cmV0dXJuIGEgKyBi',
  'https://core.parts/operations/parseInt': '?string=data:,3.14&radix=10&source=data:text/javascript;base64,cmV0dXJuIHBhcnNlSW50KHN0cmluZywgcmFkaXgp',
  'https://core.parts/operations/parseFloat': '?string=data:,3.14&source=data:text/javascript;base64,cmV0dXJuIHBhcnNlRmxvYXQoc3RyaW5nKQ',
 },
 //VALUE_CACHE = {},
 VALUE_OF = request => {
  if (PERFORMANCE_TIME++ > SAFETY_MAX) throw 'UNSAFE'
  if (request in VALUE_CACHE)
   return VALUE_CACHE[request]
  if (request.startsWith(DATA_PROTOCOL_PREFIX)) {
   const [,
    contentType = DEFAULT_CONTENT_TYPE,
    parameters = DEFAULT_PARAMETER_STRING,
    base64Mark,
    encodedBody = ''
   ] = request.match(DATA_URI_PATTERN),
    string = base64Mark ? atob(encodedBody) : encodedBody,
    variables = Object.fromEntries((parameters?.split(DATA_URI_PARAMETER_DELIM).map(e => e.split(CONFIG_ASSIGN_DELIM)) ?? []).map(([k, v]) => [k = new URL(k, VARIABLE_SET_URL).href, new URL(v, k === OPERATION_VARIABLE_URL ? OPERATION_SET_URL : CORE_URL).href])),
    operation_request = variables[OPERATION_VARIABLE_URL];
   if (operation_request) {
    delete variables[OPERATION_VARIABLE_URL]
    variables[STRING_VARIABLE_URL] = string
    const operation = VALUE_OF(operation_request)
    return operation(variables)
   }
   return body_string
  }
  const
   variable_source = request in QUERY_CACHE ? request : CORE_URL,
   variables = Object.fromEntries([...new URL(QUERY_CACHE[variable_source], variable_source).searchParams.entries()].map(([k, v]) => [k = new URL(k, VARIABLE_SET_URL).href, new URL(v, k === OPERATION_VARIABLE_URL ? OPERATION_SET_URL : variable_source).href])),
   operation_request = variables[OPERATION_VARIABLE_URL],
   source_request = variables[SOURCE_VARIABLE_URL]
  let value
  if (operation_request) {
   delete variables[OPERATION_VARIABLE_URL]
   const operation = VALUE_OF(operation_request)
   value = operation(variables)
  } else if (source_request) {
   delete variables[SOURCE_VARIABLE_URL]
   value = instance_variables => {
    const final_variables = {}, words = [], values = []
    for (const variable_url in variables) {
     try {
      final_variables[variable_url] = VALUE_OF(instance_variables[variable_url] ?? variables[variable_url])
     } catch (e) {
      final_variables[variable_url] = e
     } finally {
      const word = variable_url.match(WORD_PATTERN)?.[1];
      const isWord = word && !RESERVED_WORDS.includes(word)
      if (isWord) {
       words.push(word)
       values.push(final_variables[variable_url])
      }
     }
    }
    const source = VALUE_OF(source_request)
    return new Function(VARIABLES_WORD, ...words, WORDS_WORD, source)(final_variables, ...values, words)
   }
  } else {
   // dream: ƒ⁻¹ = y => (x = { ... })
   value = variables
  }
  return VALUE_CACHE[request] = value
 }
throw 'no'
let PERFORMANCE_TIME = 0;
console.log(VALUE_OF('https://core.parts/abc'))