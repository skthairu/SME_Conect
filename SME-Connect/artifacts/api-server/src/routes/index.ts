import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import membersRouter from "./members";
import coordinatorsRouter from "./coordinators";
import sectorsRouter from "./sectors";
import eventsRouter from "./events";
import bnakAiRouter from "./bnak-ai";
import verificationRouter from "./verification";
import marketplaceRouter from "./marketplace";
import emobilityRouter from "./emobility";
import donationsRouter from "./donations";
import partnersRouter from "./partners";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(membersRouter);
router.use(coordinatorsRouter);
router.use(sectorsRouter);
router.use(eventsRouter);
router.use(bnakAiRouter);
router.use(verificationRouter);
router.use(marketplaceRouter);
router.use(emobilityRouter);
router.use(donationsRouter);
router.use(partnersRouter);

export default router;
