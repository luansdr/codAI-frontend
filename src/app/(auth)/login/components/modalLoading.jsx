import Loading from '@//app/loading';
import React from 'react';

export default function LoadingModal() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-woodsmoke-950 p-10 rounded-lg shadow-2xl">
      <div className="dank-ass-loader ">
      <div className="row">
         <div className="arrow up outer outer-18"></div>
         <div className="arrow down outer outer-17"></div>
         <div className="arrow up outer outer-16"></div>
         <div className="arrow down outer outer-15"></div>
         <div className="arrow up outer outer-14"></div>
      </div>
      <div className="row">
         <div className="arrow up outer outer-1"></div>
         <div className="arrow down outer outer-2"></div>
         <div className="arrow up inner inner-6"></div>
         <div className="arrow down inner inner-5"></div>
         <div className="arrow up inner inner-4"></div>
         <div className="arrow down outer outer-13"></div>
         <div className="arrow up outer outer-12"></div>
      </div>
      <div className="row">
         <div className="arrow down outer outer-3"></div>
         <div className="arrow up outer outer-4"></div>
         <div className="arrow down inner inner-1"></div>
         <div className="arrow up inner inner-2"></div>
         <div className="arrow down inner inner-3"></div>
         <div className="arrow up outer outer-11"></div>
         <div className="arrow down outer outer-10"></div>
      </div>
      <div className="row">
         <div className="arrow down outer outer-5"></div>
         <div className="arrow up outer outer-6"></div>
         <div className="arrow down outer outer-7"></div>
         <div className="arrow up outer outer-8"></div>
         <div className="arrow down outer outer-9"></div>
      </div>
   </div>
        <div className="mt-4 text-center">Autenticando...</div>
      </div>
    </div>
  );
}
