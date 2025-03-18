import sdk from '@api/qase';
import fs from 'fs';
import { ObjectType } from '@classes/objectType';
import LoadEnvironment from '@utils/loadEnvironment';

const PROJECT_ID = String(LoadEnvironment.getInfo('qaseProject'));

const TOKEN = String(LoadEnvironment.getInfo('qaseToken'));

const RUN_NAME = LoadEnvironment.getArguments().name;

let runId;

/**
 * Creates a test run result in Qase.
 * @param {string} project - The project code.
 * @param {number} testRunId - The ID of the test run.
 * @param {number} caseId - The ID of the test case.
 * @param {string} result - The result of the test case.
 * @param {string} comment - The comment for the test case result.
 */
async function createTestRunResult(
  project: string,
  testRunId: number,
  caseId: number,
  result: string,
  comment: string,
): Promise<void> {
  sdk.auth(TOKEN);
  sdk.createResult({
    case_id: caseId,
    status: result,
    comment,
  },
  {
    code: project,
    id: testRunId,
  })
    // eslint-disable-next-line no-console
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
}

/**
 * Creates a test run in Qase.
 * @param {string} project - The project code.
 * @param {number[]} testCases - The list of test case IDs.
 * @param {string} title - The title of the test run.
 */
async function createTestRun(project: string, testCases: number[], title: string) {
  sdk.auth(TOKEN);
  runId = await sdk.createRun({
    title,
    cases: testCases,
  },
  {
    code: project,
  })
    .then(({ data }) => {
      // eslint-disable-next-line no-console
      console.log(data);
      return data.result.id;
    })
    .catch((err) => console.error(err));
}

/**
 * Retrieves the test cases from the output file.
 * @returns {{ testIDs: number[], tests: ObjectType[] }} The test IDs and test details.
 */
function getTests() {
  const exp = new RegExp(`${PROJECT_ID}-([0-9]*)`, 'g');
  const res: { testIDs: number[], tests: ObjectType[] } = {
    testIDs: [],
    tests: [],
  };
  const rawdata = fs.readFileSync('./output.json');
  const jsonData = JSON.parse(rawdata.toString());

  for (const testResults of jsonData.testResults) {
    for (const test of testResults.assertionResults) {
      if (test.status === 'passed' || test.status === 'failed') {
        const id = Array.from(test.title.matchAll(exp), ([_, g1]) => g1).map(Number)[0];
        res.testIDs.push(id);
        res.tests.push({
          id,
          result: test.status,
          comment: test.failureDetails && test.failureDetails[0] ? JSON.stringify(test.failureDetails[0]) : '',
        });
      }
    }
  }
  return res;
}

/**
 * Runs the test process.
 * @param {string} project - The project code.
 * @param {string} title - The title of the test run.
 */
async function run(project: string, title: string) {
  const tests = getTests();
  await createTestRun(project, tests.testIDs, title);
  // eslint-disable-next-line no-console
  console.log(runId);

  const promises = tests.tests.map((test) => createTestRunResult(project, runId, test.id, test.result, test.comment));

  await Promise.all(promises);
}

run(PROJECT_ID, RUN_NAME);
