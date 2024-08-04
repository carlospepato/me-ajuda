import { PanicFunction } from "../types/types";
import { prisma } from "../utils/prisma";

export async function createPanicFunction(props: PanicFunction) {
  const panicFunction = await prisma.panicFunction.create({
    data: {
      typeRisk: props.typeRisk,
      city: props.city,
      concluded: props.concluded,
      riskAlertId: props.riskAlertId,
      date: new Date()
    }
  });
  
  return {
    message: 'Panic function created',
    panicFunction: {
      ...panicFunction,
      date: panicFunction.date.toISOString()
    }
  };
}
