// @generated by protoc-gen-connect-es v0.13.0 with parameter "target=js"
// @generated from file bilibili/app/viewunite/v1/viewunite.proto (package bilibili.app.viewunite.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ArcRefreshReply, ArcRefreshReq, RelatesFeedReply, RelatesFeedReq, ViewProgressReply, ViewProgressReq, ViewReply, ViewReq } from "./viewunite_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * 统一视频信息接口 (7.41.0+)
 *
 * @generated from service bilibili.app.viewunite.v1.View
 */
export const View = {
  typeName: "bilibili.app.viewunite.v1.View",
  methods: {
    /**
     * 
     *
     * @generated from rpc bilibili.app.viewunite.v1.View.ArcRefresh
     */
    arcRefresh: {
      name: "ArcRefresh",
      I: ArcRefreshReq,
      O: ArcRefreshReply,
      kind: MethodKind.Unary,
    },
    /**
     * 视频详情页下方推荐
     *
     * @generated from rpc bilibili.app.viewunite.v1.View.RelatesFeed
     */
    relatesFeed: {
      name: "RelatesFeed",
      I: RelatesFeedReq,
      O: RelatesFeedReply,
      kind: MethodKind.Unary,
    },
    /**
     * 
     *
     * @generated from rpc bilibili.app.viewunite.v1.View.View
     */
    view: {
      name: "View",
      I: ViewReq,
      O: ViewReply,
      kind: MethodKind.Unary,
    },
    /**
     * 
     *
     * @generated from rpc bilibili.app.viewunite.v1.View.ViewProgress
     */
    viewProgress: {
      name: "ViewProgress",
      I: ViewProgressReq,
      O: ViewProgressReply,
      kind: MethodKind.Unary,
    },
  }
};

