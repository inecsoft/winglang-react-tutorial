"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const fs = $stdlib.fs;
const util = $stdlib.util;
const api = require("./preflight.api-2.cjs");
const utils = require("./preflight.utils-1.cjs");
class AppTfAws extends api.AppBase {
  constructor($scope, $id, props) {
    super($scope, $id, props);
    (utils.Utils.execSync(this.buildCommand, this.env, this.path));
    if ((fs.Util.exists((fs.Util.join(this.buildDir, "wing.js"))))) {
      (fs.Util.remove((fs.Util.join(this.buildDir, "wing.js"))));
    }
    this.website = this.node.root.new("@winglang/sdk.cloud.Website", cloud.Website, this, "Website", { path: this.buildDir, errorDocument: "index.html", domain: this.props.domain });
  }
  getUrl() {
    return this.website.url;
  }
  _preSynthesize() {
    (this.website.addFile("wing.js", String.raw({ raw: ["// This file is generated by wing\nwindow.wingEnv = ", ";"] }, ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(this.env)), ({"contentType": "text/javascript"})));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.AppTfAws-4.cjs")({
        $api_AppBase: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(api.AppBase, "", "AppBase"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const AppTfAwsClient = ${AppTfAws._toInflightType()};
        const client = new AppTfAwsClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return $stdlib.core.mergeLiftDeps(super._liftMap, {
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { AppTfAws };
//# sourceMappingURL=preflight.tfaws-4.cjs.map