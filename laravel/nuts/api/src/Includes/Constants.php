<?php

/**
 * @condt SUCCESS_STATUS / ERROR JSON success response status
 */
const SUCCESS_STATUS    = "success";
const ERROR_STATUS      = "error";

const SUCCESS_MESSAGE    = "success";
const ERROR_MESSAGE      = "error";

// JSON success response messages
const SEND_USER_WITH_JWT_TOKEN              = 'send user with jwt token';
const SEND_USER_WITH_REFRESHED_JWT_TOKEN    = 'send user with refreshed jwt token';

// JSON response for the password reset Email
const SEND_RESET_LINK_EMAIL_SUCCESSFULLY    = 'send reset link email successfully';
const COULD_NOT_SEND_THE_RESET_LINK_EMAIL   = 'could not send the reset link email';

// JSON response for the password reset
const PASSWORD_RESET_SUCCESSFULLY           = 'password reset successfully';
const COULD_NOT_RESET_PASSWORD              = 'could not reset password';

// JSON error Login throttles
const TOO_MANY_LOGIN_ATTEMPTS               = 'Too many login attempts';

// JSON error response message
const COULD_NOT_CREATE_TOKEN                = 'could not create token';
const INVALID_CREDENTIALS                   = 'invalid credentials';
const TOKEN_INVALID                         = 'token invalid';
const TOKEN_ABSENT                          = 'token absent';
const TOKEN_UNREFRESHABLE                   = 'token unrefreshable';
const TOKEN_EXPIRED_AND_UNREFRESHABLE       = 'token expired and unrefreshable';
const TOKEN_NOT_PROVIDED                    = 'token not provided';
const TOKEN_COULD_NOT_BE_PARSED             = 'token could not be parsed';
const USER_NOT_FOUND                        = 'user not found';
const VALIDATION_ERROR                      = 'validation error';
const USER_CALENDAR_NOT_FOUND               = 'user calendar not found';

// OK(200)
const CODE_SEND_USER_WITH_JWT_TOKEN             = 200;
const CODE_SEND_RESET_LINK_EMAIL_SUCCESSFULLY   = 200;
const CODE_PASSWORD_RESET_SUCCESSFULLY          = 200;

// ACCEPTED(202)
const CODE_SEND_USER_WITH_REFRESHED_JWT_TOKEN   = 202;

// BAD_REQUEST(400)
const CODE_COULD_NOT_SEND_THE_RESET_LINK_EMAIL  = 400;
const CODE_COULD_NOT_RESET_PASSWORD             = 400;
const CODE_COULD_NOT_CREATE_TOKEN               = 400; // 5xx ??
const CODE_USER_NOT_FOUND                       = 400;
const CODE_USER_CALENDAR_NOT_FOUND              = 400;

// Forbidden(403)
const CODE_TOO_MANY_LOGIN_ATTEMPTS              = 403;

// Not Acceptable(406)
const CODE_TOKEN_INVALID                        = 406;
const CODE_TOKEN_ABSENT                         = 406;
const CODE_TOKEN_UNREFRESHABLE                  = 406;
const CODE_TOKEN_EXPIRED_AND_UNREFRESHABLE      = 406;
const CODE_TOKEN_NOT_PROVIDED                   = 406; // same as TOKEN_ABSENT
const CODE_TOKEN_COULD_NOT_BE_PARSED            = 406;

// Unauthorized(422)
const CODE_INVALID_CREDENTIALS                  = 422;

// UNPROCESSABLE_ENTITY
const CODE_VALIDATION_ERROR                     = 422;

// HTTP Status codes (These are in Symfony/Component/HttpFoundation/Response.php)
//const HTTP_CONTINUE = 100;
//const HTTP_SWITCHING_PROTOCOLS = 101;
//const HTTP_PROCESSING = 102;            // RFC2518
//const HTTP_OK = 200;
//const HTTP_CREATED = 201;
//const HTTP_ACCEPTED = 202;
//const HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
//const HTTP_NO_CONTENT = 204;
//const HTTP_RESET_CONTENT = 205;
//const HTTP_PARTIAL_CONTENT = 206;
//const HTTP_MULTI_STATUS = 207;          // RFC4918
//const HTTP_ALREADY_REPORTED = 208;      // RFC5842
//const HTTP_IM_USED = 226;               // RFC3229
//const HTTP_MULTIPLE_CHOICES = 300;
//const HTTP_MOVED_PERMANENTLY = 301;
//const HTTP_FOUND = 302;
//const HTTP_SEE_OTHER = 303;
//const HTTP_NOT_MODIFIED = 304;
//const HTTP_USE_PROXY = 305;
//const HTTP_RESERVED = 306;
//const HTTP_TEMPORARY_REDIRECT = 307;
//const HTTP_PERMANENTLY_REDIRECT = 308;  // RFC7238
//const HTTP_BAD_REQUEST = 400;
//const HTTP_UNAUTHORIZED = 401;
//const HTTP_PAYMENT_REQUIRED = 402;
//const HTTP_FORBIDDEN = 403;
//const HTTP_NOT_FOUND = 404;
//const HTTP_METHOD_NOT_ALLOWED = 405;
//const HTTP_NOT_ACCEPTABLE = 406;
//const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
//const HTTP_REQUEST_TIMEOUT = 408;
//const HTTP_CONFLICT = 409;
//const HTTP_GONE = 410;
//const HTTP_LENGTH_REQUIRED = 411;
//const HTTP_PRECONDITION_FAILED = 412;
//const HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
//const HTTP_REQUEST_URI_TOO_LONG = 414;
//const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
//const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
//const HTTP_EXPECTATION_FAILED = 417;
//const HTTP_I_AM_A_TEAPOT = 418;                                               // RFC2324
//const HTTP_MISDIRECTED_REQUEST = 421;                                         // RFC7540
//const HTTP_UNPROCESSABLE_ENTITY = 422;                                        // RFC4918
//const HTTP_LOCKED = 423;                                                      // RFC4918
//const HTTP_FAILED_DEPENDENCY = 424;                                           // RFC4918
//const HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425;   // RFC2817
//const HTTP_UPGRADE_REQUIRED = 426;                                            // RFC2817
//const HTTP_PRECONDITION_REQUIRED = 428;                                       // RFC6585
//const HTTP_TOO_MANY_REQUESTS = 429;                                           // RFC6585
//const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;                             // RFC6585
//const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
//const HTTP_INTERNAL_SERVER_ERROR = 500;
//const HTTP_NOT_IMPLEMENTED = 501;
//const HTTP_BAD_GATEWAY = 502;
//const HTTP_SERVICE_UNAVAILABLE = 503;
//const HTTP_GATEWAY_TIMEOUT = 504;
//const HTTP_VERSION_NOT_SUPPORTED = 505;
//const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506;                        // RFC2295
//const HTTP_INSUFFICIENT_STORAGE = 507;                                        // RFC4918
//const HTTP_LOOP_DETECTED = 508;                                               // RFC5842
//const HTTP_NOT_EXTENDED = 510;                                                // RFC2774
//const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;                             // RFC6585
