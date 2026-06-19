-- Keep the newest application per user before enforcing one application row per user.
DELETE FROM "Application"
WHERE "id" IN (
  SELECT "id"
  FROM (
    SELECT
      "id",
      row_number() OVER (PARTITION BY "userId" ORDER BY "createdAt" DESC, "id" DESC) AS row_number
    FROM "Application"
  ) ranked_applications
  WHERE ranked_applications.row_number > 1
);

DROP INDEX IF EXISTS "Application_userId_idx";

CREATE UNIQUE INDEX "Application_userId_key" ON "Application"("userId");
