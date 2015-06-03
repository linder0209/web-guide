'use strict';

angular.module('webGuideApp')
  .factory('webGuideManageService', ['guideHttpService', function (guideHttpService) {
    return {
      saveGuide: function (data, success) {
        guideHttpService.post('', data).then(success);
      },
      getGuide: function (type, success) {
        guideHttpService.get('manage/' + type).then(success);
      }
    };
  }])
  .factory('publishMethod', [function () {
    return {
      /**
       * 根据文章内容生成目录以及与之相关的目录内容
       * @param content
       * @returns {Object}
       */
      generateHtml: function (content) {
        var generateIndex = 0;
        var privateFn = {
          /**
           * 遍历子结点，生成一颗树，各结点之间存在父子关系
           * @param elements 目录 elements
           * @returns {Array}
           */
          generateTree: function (elements) {
            var nodes = [];
            nodes.push({
              id: elements[0].tagName + '-' + generateIndex++,
              tagName: elements[0].tagName,
              text: $(elements[0]).html(),
              parent: null,
              el: elements[0]
            });

            for (var i = 1; i < elements.length; i++) {
              var parent = null;
              if (elements[i].tagName > elements[i - 1].tagName) {// 比如：h4 > h3
                parent = nodes[i - 1].id;
              } else if (elements[i].tagName === elements[i - 1].tagName) {
                parent = nodes[i - 1].parent;
              } else {
                var tagName = elements[i].tagName;
                var j = i - 1;
                /*jshint -W035*/
                while (tagName <= nodes[--j].tagName) {
                }
                parent = nodes[j].id;
              }
              nodes.push({
                id: elements[i].tagName + '-' + generateIndex++,
                tagName: elements[i].tagName,
                text: $(elements[i]).html(),
                parent: parent,
                el: elements[i]
              });
            }
            return nodes;
          },
          /**
           * 把 nodes {Array} 数据（存在父子节点关系）转换为菜单数据
           * @param nodes 要转换的数组
           * @returns {Array}
           */
          generateMenu: function (nodes) {
            var array = [];

            var i, len = nodes.length, map = {};
            //数组转换为键值对，并且设置属性children
            for (i = 0; i < len; i++) {
              nodes[i].children = [];
              map[nodes[i].id] = nodes[i];
            }

            var hashMap = {};
            nodes.forEach(function (item) {
              if (!hashMap[item.id]) {//如果没有处理该item
                hashMap[item.id] = item;//标记为处理

                var parentId = item.parent;
                if (parentId) {//有父节点
                  if (hashMap[parentId]) {//父节点是否被处理过（即放入到array中）
                    hashMap[parentId].children.push(item);
                  } else {
                    var parentNode = map[parentId];
                    if (parentNode) {
                      //设置子节点
                      parentNode.children.push(item);
                      array.push(parentNode);//放置父节点
                      hashMap[parentId] = parentNode;//标记为处理过
                    } else {//虽然parentId 存在，但父节点已被删除，则被归类到没有父节点
                      array.push(item);
                    }
                  }
                } else {//没有父节点，直接放入array中
                  array.push(item);
                }
              }
            });
            return array;
          },

          /**
           * 根据 nodes 生成目录html
           * @param nodes
           * @param parentTarget
           * @returns {string}
           */
          generateCatalogHtml: function (nodes, parentTarget) {
            var prefix = 'catalog-';
            var html = '';
            if (nodes && nodes.length > 0) {
              html = '<ul class="nav">';
              for (var i = 0, len = nodes.length; i < len; i++) {
                var node = nodes[i];
                var target = parentTarget + i;
                $(node.el).attr('data-target', prefix + target);
                html += '<li>';
                html += '<a href="javascript:void(0)" data-target="' + prefix + target + '">' + node.text + '</a>';
                if (node.children && node.children.length > 0) {
                  html += this.generateCatalogHtml(node.children, target + '-');
                }

                html += '</li>';
              }
              html += '</ul>';
            }
            return html;
          }
        };


        var $tempContent = $('<div style="display: none;"/>').html(content);
        if ($tempContent.find('h1,h2,h3,h4,h5,h6').length === 0) {
          $tempContent.remove();
          return {};
        }

        var nodes = [];
        //找文章对应目录，支持h1到h6
        var hEl, i = 1, filter;
        while (i <= 6) {
          filter = '';
          for (var j = i + 1; j <= 6; j++) {
            if (j === 6) {
              filter += 'h' + j;
            } else {
              filter += 'h' + j + ',';
            }
          }
          //content.find('h' + i + ':not([data-traverse="true"])')
          hEl = $tempContent.find('h' + i + '[data-traverse!="true"]');
          var innerNodes = [];
          if (hEl.length > 0) {
            for (var k = 0; k < hEl.length; k++) {
              var elements = $(hEl[k]).nextUntil('h' + i, filter).andSelf();
              //标记已经遍历过
              elements.attr('data-traverse', 'true');
              innerNodes = innerNodes.concat(privateFn.generateTree(elements));
            }
          }
          nodes = innerNodes.concat(nodes);
          i++;
        }
        var menus = privateFn.generateMenu(nodes);
        var catalogueHtml = privateFn.generateCatalogHtml(menus, '');
        //删除属性data-traverse
        $tempContent.find('[data-traverse]').removeAttr('data-traverse');

        var contentHtml = $tempContent.html();
        $tempContent.remove();
        return {catalogue: catalogueHtml, content: contentHtml};
      }
    };
  }]);
