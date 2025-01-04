import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let authToken = localStorage.getItem('accessToken');
  if (authToken !== null) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
       
      
      },
     
    });
   return next(authReq);
    // return next.handle(request);
  }
  return next(req);
};
