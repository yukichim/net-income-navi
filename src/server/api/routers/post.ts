import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CalculateSocialInsuranceUseCase } from "@/domain/use-cases/calculate-social-insurance";

const monthlyPaymentSchema = z.object({
	month: z.number().int().min(1).max(12),
	basicSalary: z.number().min(0),
	overtimeAllowance: z.number().min(0).optional(),
	commutingAllowance: z.number().min(0).optional(),
	positionAllowance: z.number().min(0).optional(),
	familyAllowance: z.number().min(0).optional(),
	housingAllowance: z.number().min(0).optional(),
	otherAllowances: z.number().min(0).optional(),
	paymentDays: z.number().int().min(0).max(31),
	bonus: z.number().min(0).optional(),
});

export const socialInsuranceRouter = createTRPCRouter({
	calculate: publicProcedure
		.input(
			z.object({
				aprilSalary: z.number().min(0, "4月の給与は0以上である必要があります"),
				maySalary: z.number().min(0, "5月の給与は0以上である必要があります"),
				juneSalary: z.number().min(0, "6月の給与は0以上である必要があります"),
				age: z.number().int().min(0, "年齢は0歳以上である必要があります").max(120, "年齢は120歳以下である必要があります"),
				prefecture: z.string().optional().default("tokyo"),
			})
		)
		.query(({ input }) => {
			const useCase = new CalculateSocialInsuranceUseCase();
			
			try {
				const result = useCase.execute(input);
				return {
					success: true,
					data: result,
					error: null,
				};
			} catch (error) {
				return {
					success: false,
					data: null,
					error: error instanceof Error ? error.message : "計算中にエラーが発生しました",
				};
			}
		}),

	calculateDetailed: publicProcedure
		.input(
			z.object({
				monthlyPayments: z.array(monthlyPaymentSchema).min(1, "少なくとも1ヶ月分の報酬情報が必要です"),
				age: z.number().int().min(0, "年齢は0歳以上である必要があります").max(120, "年齢は120歳以下である必要があります"),
				isPartTime: z.boolean().optional(),
				prefecture: z.string().optional().default("tokyo"),
			})
		)
		.query(({ input }) => {
			const useCase = new CalculateSocialInsuranceUseCase();
			
			try {
				const result = useCase.executeDetailed(input);
				return {
					success: true,
					data: result,
					error: null,
				};
			} catch (error) {
				return {
					success: false,
					data: null,
					error: error instanceof Error ? error.message : "計算中にエラーが発生しました",
				};
			}
		}),
});
