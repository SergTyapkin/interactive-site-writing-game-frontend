import ace from 'ace-builds';

import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl);

import modeHtmlUrl from 'ace-builds/src-noconflict/mode-html?url';
ace.config.setModuleUrl('ace/mode/html', modeHtmlUrl);

import modeCssUrl from 'ace-builds/src-noconflict/mode-css?url';
ace.config.setModuleUrl('ace/mode/css', modeCssUrl);

import themeMonokaiUrl from 'ace-builds/src-noconflict/theme-monokai?url';
ace.config.setModuleUrl('ace/theme/monokai', themeMonokaiUrl);

import workerBaseUrl from 'ace-builds/src-noconflict/worker-base?url';
ace.config.setModuleUrl('ace/mode/base', workerBaseUrl);

import workerJavascriptUrl from 'ace-builds/src-noconflict/worker-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);

import workerHtmlUrl from 'ace-builds/src-noconflict/worker-html?url';
ace.config.setModuleUrl('ace/mode/html_worker', workerHtmlUrl);

import workerCssUrl from 'ace-builds/src-noconflict/worker-css?url';
ace.config.setModuleUrl('ace/mode/css_worker', workerCssUrl);

import snippetsHtmlUrl from 'ace-builds/src-noconflict/snippets/html?url';
ace.config.setModuleUrl('ace/snippets/html', snippetsHtmlUrl);

import snippetsJsUrl from 'ace-builds/src-noconflict/snippets/javascript?url';
ace.config.setModuleUrl('ace/snippets/javascript', snippetsJsUrl);

import snippetsCssUrl from 'ace-builds/src-noconflict/snippets/css?url';
ace.config.setModuleUrl('ace/snippets/css', snippetsCssUrl);

import extSearchboxUrl from 'ace-builds/src-noconflict/ext-searchbox?url';
ace.config.setModuleUrl('ace/ext/searchbox', extSearchboxUrl);

import 'ace-builds/src-noconflict/ext-language_tools';
ace.require("ace/ext/language_tools");
