// @generated by protoc-gen-es v1.3.1 with parameter "target=js"
// @generated from file bilibili/community/service/govern/v1/govern.proto (package bilibili.community.service.govern.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message bilibili.community.service.govern.v1.QoeReportReq
 */
export const QoeReportReq = proto3.makeMessageType(
  "bilibili.community.service.govern.v1.QoeReportReq",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "scene", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "cancel", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "business_type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "oid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 7, name: "score_result", kind: "message", T: QoeScoreResult },
    { no: 8, name: "business_data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message bilibili.community.service.govern.v1.QoeScoreResult
 */
export const QoeScoreResult = proto3.makeMessageType(
  "bilibili.community.service.govern.v1.QoeScoreResult",
  () => [
    { no: 1, name: "score", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ],
);

