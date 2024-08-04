import { prisma } from "../utils/prisma";

export async function getAllRiskSituation() {
  return prisma.riskSituation.findMany();
}

export async function getRisk(riskSituationId: number) {
  return prisma.risk.findUnique({
    where: {
      id: riskSituationId
    }
  });
}