"use server";

import * as authActions from "@/app/lib/actions/auth";
import * as seriesActions from "@/app/lib/actions/series";
import * as timerActions from "@/app/lib/actions/timer";

const { authenticate, register } = authActions;
const { createSeries, editSeries, deleteSeries } = seriesActions;
const { createTimer, editTimer, deleteTimer } = timerActions;

export {
  authenticate,
  createSeries,
  createTimer,
  deleteSeries,
  deleteTimer,
  editSeries,
  editTimer,
  register,
};
