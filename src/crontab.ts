import cron from "node-cron";

const MINUTES = process.env.MINUTES || "*";
const HOURS = "*";
const DAY_OF_MONTH = "*";
const MONTH = "*";
const DAY_OF_WEEK = "*";

const CLEANUP = `${MINUTES} ${HOURS} ${DAY_OF_MONTH} ${MONTH} ${DAY_OF_WEEK}`;

var task: cron.ScheduledTask;

/**
 * example schedule cleanup for this "room"
 */
function startScheduledTask(o: any, k: string) {
  task = cron.schedule(CLEANUP, () => {
    const room = o[k];
    console.log(`cleanup expired messages every ${MINUTES} minute(s)`);
  });
}

function stopScheduledTask() {
  task.destroy();
}

export { startScheduledTask, stopScheduledTask };
