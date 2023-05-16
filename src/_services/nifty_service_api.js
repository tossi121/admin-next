import { fetcher } from "_helper/ApiBase";

export async function getLoginAdmin(params) {
  try {
    const response = await fetcher('POST', process.env.LOGIN, params);
    return response;
  } catch (err) {
    return err;
  }
}

// USER MANAGEMENT DATA
export async function getUserDataList(params) {
  try {
    const response = await fetcher('GET', process.env.USER_LIST_DATA, params);
    return response;
  } catch (err) {
    return err;
  }
}

export async function getUserOrderData(params) {
  try {
    const response = await fetcher('GET', process.env.USER_ORDER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getUserReviewData(params) {
  try {
    const response = await fetcher('GET', process.env.USER_REVIEW_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getUserQueriesData(params) {
  try {
    const response = await fetcher('GET', process.env.USER_QUERIES_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getActiveUserData(params) {
  try {
    const response = await fetcher('GET', process.env.ACITVE_PRIME_USER_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getUserDetails(params) {
  try {
    const response = await fetcher('GET', process.env.USER_DETAILS_DATA, params);
    return response;
  } catch (err) {
    return null;
  }
}

export async function updateUserDetails(params) {
  try {
    const response = await fetcher('POST', process.env.UPDATE_DETAILS_DATA, params);
    return response;
  } catch (err) {
    return null;
  }
}

//STOCK LIST DATA
export async function getStockDataList(params) {
  try {
    const response = await fetcher('GET', process.env.STOCK_DATA_LIST, params);
    return response;
  } catch (err) {
    return null;
  }
}
export async function deleteStockData(params) {
  try {
    const response = await fetcher('GET', process.env.DELETE_STOCK_DATA_LIST, params);
    return response;
  } catch (err) {
    return null;
  }
}
export async function createStockData(params) {
  try {
    const response = await fetcher('POST', process.env.CREATE_STOCK_DATA_LIST, params);
    return response;
  } catch (err) {
    return null;
  }
}
export async function getStockDetail(params) {
  try {
    const response = await fetcher('GET', process.env.GET_STOCK_DATA_LIST, params);
    return response;
  } catch (err) {
    return null;
  }
}

//NIFTY 50 STOCKLIST
export async function getNifty50List(params) {
  try {
    const response = await fetcher('GET', process.env.GET_NIFTY50_DATA_LIST, params);
    return response;
  } catch (err) {
    return null;
  }
}

// FNO LIST STOCKLIST
export async function getFnoList(params) {
  try {
    const response = await fetcher('GET', process.env.GET_FNOLIST_DATA_LIST, params);
    return response;
  } catch (err) {
    return null;
  }
}

// TERMS DATA
export async function getTermsData(params) {
  try {
    const response = await fetcher('GET', process.env.GET_TERMS_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function createTermsData(params) {
  try {
    const response = await fetcher('POST', process.env.SAVE_TERMS_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function deleteTermsData(params) {
  try {
    const response = await fetcher('GET', process.env.DELETE_TERMS_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function updateTermsData(params) {
  try {
    const response = await fetcher('GET', process.env.UPDATE_TERMS_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

//indian-stock-list
export async function getIndianStockList(params) {
  try {
    const response = await fetcher('GET', process.env.INDIAN_STOCK_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

// borker api's


export async function getBrokerReviewData(params) {
  try {
    const response = await fetcher('GET', process.env.BORKER_REVIEW_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function updateBrokerReviewData(params) {
  try {
    const response = await fetcher('POST', process.env.UPDATE_BORKER_REVIEW_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function getEnquiryListData(params) {
  try {
    const response = await fetcher('GET', process.env.BORKER_ENQUIRY_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getCompareBrokerListData(params) {
  try {
    const response = await fetcher('GET', process.env.COMPARE_BORKER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function addBrokerData(params) {
  try {
    const response = await fetcher('POST', process.env.ADD_BORKER_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function deleteBrokerData(params) {
  try {
    const response = await fetcher('GET', process.env.DELETE_BORKER_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function updateBrokerData(params) {
  try {
    const response = await fetcher('GET', process.env.UPDATE_BORKER_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

// prime plan
export async function getPrimePlanList(params) {
  try {
    const response = await fetcher('GET', process.env.GET_PRIME_PLAN_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function deletePrimePlanList(params) {
  try {
    const response = await fetcher('GET', process.env.DELETE_PRIME_PLAN_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function updatePrimePlanList(params) {
  try {
    const response = await fetcher('GET', process.env.UPDATE_PRIME_PLAN_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function savePrimePlanList(params) {
  try {
    const response = await fetcher('POST', process.env.SAVE_PRIME_PLAN_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}


// settings
export async function getGlobalSettingData(params) {
  try {
    const response = await fetcher('GET', process.env.GET_GLOVAL_SETTING_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function saveGlobalSetting(params) {
  try {
    const response = await fetcher('POST', process.env.SAVE_GLOVAL_SETTING_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getGeneralPromoList(params) {
  try {
    const response = await fetcher('GET', process.env.GET_GENRAL_PROMO_LIST, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function updateGeneralPromoList(params) {
  try {
    const response = await fetcher('GET', process.env.UPDATE_GENRAL_PROMO_LIST, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function deletePromoList(params) {
  try {
    const response = await fetcher('GET', process.env.DELETE_GENRAL_PROMO_LIST, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function addPromoList(params) {
  try {
    const response = await fetcher('POST', process.env.ADD_GENRAL_PROMO_LIST, params);
    return response;
  } catch (err) {
    throw err;
  }
}

// promo-global
export async function getGlobalPromoList(params) {
  try {
    const response = await fetcher('GET', process.env.GET_GLOBAL_PROMO_LIST, params);
    return response;
  } catch (err) {
    throw err;
  }
}
export async function saveGlobalPromoList(params) {
  try {
    const response = await fetcher('POST', process.env.SAVE_GLOBAL_PROMO_LIST, params);
    return response;
  } catch (err) {
    throw err;
  }
}

// alert-data
export async function getAlertData(params) {
  try {
    const response = await fetcher('GET', process.env.GET_ALERT_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function saveAlertData(params) {
  try {
    const response = await fetcher('POST', process.env.SAVE_ALERT_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

// app version
export async function getAppVersionData(params) {
  try {
    const response = await fetcher('GET', process.env.GET_APP_VERSION, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function UpdateAppVersion(params) {
  try {
    const response = await fetcher('POST', process.env.UPDATE_APP_VERSION, params);
    return response;
  } catch (err) {
    throw err;
  }
}

//screener group
export async function getScreenerListData(params) {
  try {
    const response = await fetcher('GET', process.env.GET_SCREENER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function addScreenerData(params) {
  try {
    const response = await fetcher('POST', process.env.ADD_SCREENER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function deleteScreenerData(params) {
  try {
    const response = await fetcher('GET', process.env.DELETE_SCREENER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}

export async function updateScreenerData(params) {
  try {
    const response = await fetcher('GET', process.env.UPDATE_SCREENER_LIST_DATA, params);
    return response;
  } catch (err) {
    throw err;
  }
}
