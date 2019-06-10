const {ccclass, property} = cc._decorator;
@ccclass
export default class MKuiPanel extends cc.Component {
    
    nodeDict:Array<any> =new Array();
    anim;
    onLoad() {
        // node load --
        var linkWidget = function(self, nodeDict) {
            var children = self.children;
            for (var i = 0; i < children.length; i++) {
                var widgetName = children[i].name;
                if (widgetName && widgetName.indexOf("m_") >= 0) {
                    var nodeName = widgetName.substring(2);
                    if (nodeDict[nodeName]) {
                        cc.error("控件名字重复!" + children[i].name);
                    }
                    nodeDict[nodeName] = children[i];
                }
                if (children[i].childrenCount > 0) {
                    linkWidget(children[i], nodeDict);
                }
            }
        }.bind(this);
        linkWidget(this.node, this.nodeDict);
    }

    WX_ThreeKingFun_qinbb() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    showCompleted() {
        console.log(this.node.name + "动画播放完毕～");
    }

    show(){
        cc.log("uiPanel show");
        this.node.active = true;
    }
    hide(){
        cc.log("uiPanel hide");
        this.node.active = false;
    }

    WX_ThreeKingFun_qinbb1() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

    onDestroy() {
        if (this.anim) {
            this.anim.off('finished', this.showCompleted, this);
        }
    }

    WX_ThreeKingFun_qinb4b() {
        let aaa = 1
        let bbb = 2
        let ccc = 3
        cc.log("aaa + bbb = ", aaa + bbb)
        return aaa + bbb + ccc
    }

}
