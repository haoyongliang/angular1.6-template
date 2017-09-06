  /**
   * [ 主模板预览 ]
   */
  APP.controller('previewMainTemplateCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
    '$loading',
    '$log',
    '$appHttp',
    'localStorageService',
    'userInfo',
    'templateMainType',
    'buildVerticalCardConstant',
    ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildVerticalCardConstant) => {
      $.extend($scope, $rootScope.$stateParams);
      $rootScope.currentTemplateId = $scope.templateId;
      $rootScope.currentTypeCard = {}; //记录当前选中的分类卡
      $rootScope.currentTypeCardIndex = -1;
      $rootScope.maxViewOrder = 0;
      $scope.defaultPanel = 0;
      
      $scope.$on('files',function(e,d){
      	console.log(1111111111111111);
        $log.info(e);
        $log.info(d);
      });
      /**
       * [ 初始化分类卡 ]
       * @return {[type]} [description]
       */
      $scope.init = () => {
      
        $scope.message = "正在加载模板";
        let flag = true;
        $appHttp.getData({
          params: {
            templateId: $rootScope.currentTemplateId
          },
          before: function() {
            $loading.start('previewMainTemplate');
          },
          url: '/CommonPlatform/templateConfig!showTemp.action'
        }).then(function(resp) {
          let data = resp.data;
          flag = data.result; //请求数据成功
          if (flag) {
            $timeout(function() {
              $scope.$apply(function() {
                if (!!$rootScope.preViewData) {
                  for (let i = 0; i < $rootScope.preViewData.typeCards.length; i++) {
                    $rootScope.preViewData.typeCards[i].showed = false;
                  }
                }

                $timeout(function() {
                  let preViewData = data.data;
                  for (let i = 0; i < preViewData.typeCards.length; i++) {
                    preViewData.typeCards[i].showed = true;
                  }
                  $rootScope.preViewData = preViewData;
                  $rootScope.currentTypeCard = $rootScope.preViewData.typeCards[0]; //记录第一个选项卡
                  $rootScope.currentTypeCardIndex = 0;
                  _setMaxViewOrder();
                }, 0);
              });
            }, 0)

          }
        }).catch(function(error) {
          $log.error(error);
          $message = "加载失败";
          flag = false;
        }).finally(function() {
          if (flag) {
            $loading.finish('previewMainTemplate');
          } else {
            $timeout(function() {
              $loading.finish('previewMainTemplate');
            }, 2000);
          }
        });
      }

      /**
       * [用户点击分类卡，更新$scope.currentTypeCard,currentTypeCardIndex值，该变量存储该当前选中分类卡对象]
       * @param  {[type]} ele [ 当前分类卡对象 ]
       * @return {[type]}     [description]
       */
      $scope.selectTypeCard = function(ele, index) {
        $rootScope.currentTypeCard = ele;
        $rootScope.currentTypeCardIndex = index;
        $scope.defaultPanel = index;
        _setMaxViewOrder();
        $log.info($rootScope.currentTypeCard);
      }

      /**
       * [ 解析数据成html显示到页面 ]
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
      $scope.handler = function(obj) {
        let _buildVerticalCardConstant = buildVerticalCardConstant;
        let arr = obj.cardElements;
        let html = "";
        if (!!arr) {
          for (let i = 0; i < arr.length; i++) {
            let element = arr[i];
            switch (element.cardElementType) {
              case 0: //纵向分类卡
                html += `
                <app-vertical-card
                  style="
                    color:${element.fontColor};
                    ${_buildVerticalCardConstant.isBold[element.isBold].style};
                    ${_buildVerticalCardConstant.descPosition[element.descPosition].style}">
                  ${element.cardElementName}
                </app-vertical-card>`
                break;
              case 1: //文本
                html += `
	              <dropsea-text-content
	                title='${element.cardElementName}'
	                textrows="${element.textRows}"
	                placeholder = "${element.cardElementDesc}"
	                desc="${element.cardElementExplain}"
	                show-desc="${element.cardElementExplainShowFlag==1?true:false}">
	              </dropsea-text-content>
	            `;
              	break;
              case 2: //数字
	              let percentage;
	              switch(element.percentage){
	              	case 0:
	              	  percentage = '';
	              	  break;
	              	case 1:
	              	  percentage = '%'              	  
	              	  break;
	              };
	              switch (element.thousands){
	              	case 0:
	              	  html += `
					            <app-input title="${element.cardElementName}">
			                  <input type="text" placeholder="${element.cardElementDesc}" />
			                  <div class="w-50 f-r">${percentage} ${element.units}</div>
			                </app-input>
					          `;
					          break;
					        case 1:
					          html += `
					            <app-input title="${element.cardElementName}">
			                  <input  class="w-40" type="text" placeholder="${element.cardElementDesc}" ng-model="Number" app-currency bit="${element.decimalDigits}"/>	 
			                  <div class="w-50 f-r">${percentage} ${element.units}</div>
			                </app-input>
					          `;
					          break;              	  
	              }   
            
                break;
              case 3://选择
              	let selectType = element.selectType;
              	let multiple = selectType==1?'':'multiple';
              	html += 
              	`
              		<dropsea-select placeholder="${element.cardElementDesc}" class="clearfix" multiple='${multiple}' select-url=${element.selectURL}></dropsea-select>
              	`;
              	break;
              case 4: //日期
                let dateType2;
                switch (element.dateType) {
                  case 1:
                    dateType = 'YYYY-MM-DD HH:mm';
                    break;
                  case 2:
                    dateType = "YYYY-MM-DD";
                    break;
                  case 3:
                    dateType = "HH:mm"
                    break;
                }
                html += `
	                <app-input title="${element.cardElementName}">
	                  <input type="text" placeholder="${element.cardElementDesc}" readonly ng-model="buildData"  moment-picker="buildData" format="${dateType2}">
	                </app-input>
                `
              case 5:
                let dateType;
                switch (element.dateType) {
                  case 1:
                    dateType = 'YYYY-MM-DD HH:mm';
                    break;
                  case 2:
                    dateType = "YYYY-MM-DD";
                    break;
                  case 3:
                    dateType = "HH:mm"
                    break;
                }
                html += `
                <app-input title="${element.beginDateName}">
                  <input type="text" placeholder="${element.cardElementDesc}" readonly ng-model="beginDate"  moment-picker="beginDate" format="${dateType}">
                </app-input>
                <app-input title="${element.endDateName}">
                  <input type="text" placeholder="${element.cardElementDesc}" readonly ng-model="endDate"  moment-picker="endDate" format="${dateType}">
                </app-input>
              `;
                break;
              case 6:
								html += 
								`
									<dropsea-file-upload  title="${element.cardElementName}" placeholder="${element.cardElementDesc}" event-name="files"></dropsea-file-upload>
								`;
                break;
              case 7:
		              html += `
		                <app-detail name="${element.cardElementName}"></app-detail>             
			            `;	            
		              break;
            }
          }  
        }

        return html; 
      }

      /**
       * [ 设置最大overOrder ]
       */
      function _setMaxViewOrder() {
        let max = 0;
        if (!!$rootScope.currentTypeCard && !!$rootScope.currentTypeCard.cardElements) {
          for (let i = 0; i < $rootScope.currentTypeCard.cardElements.length; i++) {
            let ele = $rootScope.currentTypeCard.cardElements[i];
            if (ele.viewOrder > max) {
              max = ele.viewOrder;
            }
          }
          $rootScope.maxViewOrder = max;
        }
      }


      /**
       * 判断构件属性中是否包含某个type=?的对象
       */
      $rootScope.hasCardElementAttribute = function(cardElementAttributes, type) {
        if (!!cardElementAttributes) {
          for (let i = 0; i < cardElementAttributes.length; i++) {
            let attr = cardElementAttributes[i];
            if (attr.type == type) {
              return true;
            }
          }
        }

        return false;
      }
      /**
       * [ 刷新页面 ]
       * @return {[type]} [description]
       */
      $rootScope.refreshTemplateData = function() {
        $scope.message = "正在加载模板";
        let flag = true;
        $appHttp.getData({
          params: {
            templateId: $rootScope.currentTemplateId
          },
          before: function() {
            $loading.start('previewMainTemplate');
          },
          url: '/CommonPlatform/templateConfig!showTemp.action'
        }).then(function(resp) {
          let data = resp.data;
          flag = data.result; //请求数据成功
          if (flag) {
            $timeout(function() {

              $scope.$apply(
              	
                function() {
                  for (let i = 0; i < $rootScope.preViewData.typeCards.length; i++) {
                    $rootScope.preViewData.typeCards[i].showed = false;
                  }
                  $timeout(function() {
                    $rootScope.preViewData = data.data;
                    for (let i = 0; i < $rootScope.preViewData.typeCards.length; i++) {
                      $rootScope.preViewData.typeCards[i].showed = true;
                    }
                    $rootScope.currentTypeCard = $rootScope.preViewData.typeCards[$rootScope.currentTypeCardIndex];
                    _setMaxViewOrder();
                  }, 0);
                }
              );
            }, 0)
          }
        }).catch(function(error) {
          $log.error(error);
          $message = "加载失败";
          flag = false;
        }).finally(function() {
          if (flag) {
            $loading.finish('previewMainTemplate');
          } else {
            $timeout(function() {
              $loading.finish('previewMainTemplate');
            }, 2000);
          }
        });
      }
    }
  ]);
