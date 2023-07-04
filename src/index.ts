// import * as dotenv from 'dotenv-safe';

// // Expose environment variables
// dotenv.config();

// import { sum } from '@src/math';

// console.log(`Hi ${process.env.MY_NAME} your sum is `, sum(4, 5));

// Decorator function.
function asyncDecorator(asyncFn: any) {
  return function (...args: any) {
    return new Promise((resolve, reject) => {
      asyncFn(...args, (err: string | null, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Original async function.
function fetchData(asyncFn: any) {
  setTimeout(() => {
    const data = 'Async Data.';
    asyncFn(null, data);
  }, 1000);
}

// Decorate the function.
const decorated = asyncDecorator(fetchData);
// User the function in an asynction function.
async function run() {
  try {
    const data = await decorated();
    console.log(data);
  } catch (err: any) {
    console.log('Error: ', err);
  }
}
// Call the function.
run();
